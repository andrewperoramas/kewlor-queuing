<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\RemoveUserQueue;
use App\Actions\SyncQueue;
use App\Actions\UpdateUserQueue;
use App\Data\UserQueueData;
use App\Http\Requests\UserUpdateQueueRequest;
use App\Models\UserQueue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

final class AdminQueueController extends Controller
{
    public function index(Request $request): Response
    {
        $data = $request->validate([
            'search' => ['string', 'nullable'],
            'page' => ['string', 'nullable'],
        ]);

        $perPage = 15; // or however many per page
        $currentPage = $data['page'] ?? 1;

        // Get active and inactive queues
        $activeQueues = UserQueue::showOnLive()
            ->select('user_queues.id', 'user_queues.name', 'user_queues.status', 'user_queues.created_at', 'boost_count', 'message', 'initial_queue_number', 'queue_number', 'admin_notes', 'is_working',
                DB::raw('(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = 1) AS likes_count'),
                DB::raw('(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = -1) AS dislikes_count'),
                DB::raw('- queue_number +  (SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = 1) + -(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = -1) + boost_count  AS total_points'),

            );

        $inactiveQueues = UserQueue::skipped()
            ->select('user_queues.id', 'user_queues.name', 'user_queues.status', 'user_queues.created_at', 'boost_count', 'message', 'initial_queue_number', 'queue_number', 'admin_notes', 'is_working',
                DB::raw('(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = 1) AS likes_count'),
                DB::raw('(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = -1) AS dislikes_count'),
                DB::raw('   - queue_number + (SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = 1) + -(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = -1) + boost_count  AS total_points'),
            );

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
            ->paginate($perPage, ['*'], 'page', $currentPage);

        // Add row number manually
        $startIndex = ($combined->currentPage() - 1) * $combined->perPage() + 1;

        $combined->getCollection()->transform(function ($item) use (&$startIndex) {
            $item->row_number = $startIndex++;

            return $item;
        });

        return Inertia::render('admin/queues', [
            'userQueues' => UserQueueData::collect($combined),
            'completedQueues' => UserQueueData::collect(UserQueue::completed()->limit(10)->orderBy('queue_number')->paginate(10)),
            'firstInQueue' => UserQueueData::optional($combined->first()),
        ]);
    }

    public function destroy(int $queueNumber, RemoveUserQueue $removeUserQueue): RedirectResponse
    {
        $removeUserQueue->handle($queueNumber);
        session()->flash('message.success', 'Request has been removed!');

        return redirect()->back();
    }

    public function update(UserUpdateQueueRequest $userUpdateQueueRequest, UpdateUserQueue $updateUserQueue, SyncQueue $syncQueue): RedirectResponse
    {
        /**
            @var array{
                id: int,
                status: string,
                notes: string
                initial_queue_number: int,
                boost_count: int
            } $data
         */
        $data = $userUpdateQueueRequest->validated();
        $updateUserQueue->handle($data, $syncQueue);
        session()->flash('message.success', 'Queue has been updated!');
        Inertia::clearHistory();

        return redirect()->back();
    }
}
