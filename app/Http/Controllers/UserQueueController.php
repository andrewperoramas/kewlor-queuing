<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\AddUserQueue;
use App\Actions\DislikeQueue;
use App\Actions\LikeQueue;
use App\Data\UserQueueData;
use App\Http\Requests\UserQueueRequest;
use App\Models\UserQueue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

final class UserQueueController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        /** @var array<string, string> $data */
        $data = $request->validate([
            'search' => ['string', 'nullable'],
            'page' => ['string', 'nullable'],
        ]);

        /* $email = $data['email'] ?? null; */
        /* $queue_number = UserQueue::query()->active()->where('email', $email)->value('queue_number') ?? 0; */
        $perPage = 10;

        $activeQueues = UserQueue::showOnLive()->orderBy('created_at');
        $inactiveQueues = UserQueue::skipped()->orderBy('created_at');
        if (! empty($data['search'])) {
            $activeQueues = $activeQueues->where('name', 'like', "%{$data['search']}%");
            $inactiveQueues = $inactiveQueues->where('name', 'like', "%{$data['search']}%");
        }

        $combinedQueues = $activeQueues->union($inactiveQueues);

        $combinedQueues = DB::table(DB::raw("({$combinedQueues->toSql()}) as combined"))
            ->mergeBindings($combinedQueues->getQuery())
            ->orderByRaw("CASE
        WHEN status = 'completed' THEN 2
        WHEN status = 'queued' THEN 1
        WHEN status = 'skipped' THEN 3
        ELSE 4
    END")
            ->orderByRaw("CASE
        WHEN status = 'queued' THEN queue_number
        ELSE NULL
    END")

            ->paginate($perPage);

        // Calculate likes_count and dislikes_count for each item
        $combinedQueues->getCollection()->transform(function ($item) {
            $userQueue = UserQueue::find($item->id); // Retrieve the UserQueue model
            $item->likes_count = $userQueue->likes_count; // Use the accessor
            $item->dislikes_count = $userQueue->dislikes_count; // Use the accessor

            return $item;
        });

        return Inertia::render('home', [
            'userQueues' => UserQueueData::collect($combinedQueues),
        ]);

    }

    public function upvotes(Request $request): \Inertia\Response
    {
        /** @var array<string, string> $data */
        $data = $request->validate([
            'search' => ['string', 'nullable'],
            'page' => ['string', 'nullable'],
        ]);

        /* $email = $data['email'] ?? null; */
        /* $queue_number = UserQueue::query()->active()->where('email', $email)->value('queue_number') ?? 0; */
        $perPage = 10;

        /* $activeQueues = UserQueue::showOnLive()->orderBy('created_at'); */

        // Set row number variable before query
        //
        // Define pagination
        $perPage = 15; // or however many per page
        $currentPage = $data['page'] ?? 1;

        // Get active and inactive queues
        $activeQueues = UserQueue::showOnLive()
            ->select('user_queues.id', 'user_queues.name', 'user_queues.status', 'user_queues.created_at', 'boost_count', 'message', 'initial_queue_number', 'queue_number', 'admin_notes',
                DB::raw('(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = 1) AS likes_count'),
                DB::raw('(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = -1) AS dislikes_count'),
                DB::raw('- queue_number +  (SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = 1) + -(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = -1) + boost_count  AS total_points'),

            );

        $inactiveQueues = UserQueue::skipped()
            ->select('user_queues.id', 'user_queues.name', 'user_queues.status', 'user_queues.created_at', 'boost_count', 'message', 'initial_queue_number', 'queue_number','admin_notes',
                DB::raw('(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = 1) AS likes_count'),
                DB::raw('(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = -1) AS dislikes_count'),
                DB::raw('   - queue_number + (SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = 1) + -(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = -1) + boost_count  AS total_points'),
            );

        if (! empty($data['search'])) {
            $activeQueues->where('name', 'like', "%{$data['search']}%");
            $inactiveQueues->where('name', 'like', "%{$data['search']}%");
        }

        // Combine queries
        $combinedQueues = $activeQueues->union($inactiveQueues);

        $combined = DB::table(DB::raw("({$combinedQueues->toSql()}) as combined"))
            ->mergeBindings($combinedQueues->getQuery())
            ->orderByRaw("CASE
        WHEN status = 'completed' THEN 2
        WHEN status = 'queued' THEN 1
        WHEN status = 'skipped' THEN 3
        ELSE 5
    END")
            ->orderByDesc('total_points')
            ->orderByDesc('queue_number')
            /* ->orderBy('dislikes_count') */
            ->paginate($perPage, ['*'], 'page', $currentPage);

        // Add row number manually
        $startIndex = ($combined->currentPage() - 1) * $combined->perPage() + 1;

        $combined->getCollection()->transform(function ($item) use (&$startIndex) {
            $item->row_number = $startIndex++;

            return $item;
        });

        return Inertia::render('upvotes', [
            'userQueues' => UserQueueData::collect($combined),
        ]);

    }

    public function store(UserQueueRequest $request, AddUserQueue $addUserQueue, LikeQueue $likeQueue): RedirectResponse
    {
        /**
            @var array{
                id: int,
                status: string,
                queue_number: int,
                notes: string
            } $data
         */
        $data = $request->validated();

        $addUserQueue->handle($data, $likeQueue);

        session()->flash('message.success', 'You have been added to the queue!');

        return redirect()->back();
    }

    public function like(Request $request, LikeQueue $likeQueue): void
    {

        $data = $request->validate([
            'user_queue_id' => ['required', 'exists:user_queues,id',
            ],
        ],

        );

        $data['ip_address'] = $request->ip();

        $likeQueue->handle($data);

    }

    public function dislike(Request $request, DislikeQueue $dislikeQueue): void
    {

        $data = $request->validate([
            'user_queue_id' => ['required', 'exists:user_queues,id',

            ],
        ]);

        $data['ip_address'] = $request->ip();

        $dislikeQueue->handle($data);
    }
}
