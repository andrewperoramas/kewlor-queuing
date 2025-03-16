<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\AddUserQueue;
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
            'email' => ['email'],
        ]);

        $email = $data['email'] ?? null;
        $queue_number = UserQueue::query()->active()->where('email', $email)->value('queue_number') ?? 0;
        /* $perPage = 10; */

        /* $activeQueues = UserQueue::active()->orderBy('created_at'); */
        /* $inactiveQueues = UserQueue::completed()->orderBy('created_at'); */

        /* $combinedQueues = $activeQueues->union($inactiveQueues); */

        /* $combinedQueues = DB::table(DB::raw("({$combinedQueues->toSql()}) as combined")) */
        /*     ->mergeBindings($combinedQueues->getQuery()) */
        /*     ->orderByRaw('CASE WHEN queue_number = 0 THEN 1 ELSE 0 END') */
        /*     ->orderByRaw("CASE WHEN status = 'completed' THEN 1 ELSE 0 END") */
        /*     ->orderBy('queue_number') */
        /*     ->paginate($perPage); */

        return Inertia::render('home', [
            'userQueues' => Inertia::defer(fn (): array => UserQueueData::collect(UserQueue::query()->orderBy('queue_number')->paginate(10))->toArray()),
            'currentUserQueueNumber' => $queue_number,
        ]);
    }

    public function store(UserQueueRequest $request, AddUserQueue $addUserQueue): RedirectResponse
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

        $addUserQueue->handle($data);

        session()->flash('message.success', 'You have been added to the queue!');

        return redirect()->back();
    }
}
