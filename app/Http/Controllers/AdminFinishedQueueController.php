<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\MarkAsCompletedQueue;
use App\Actions\RemoveUserQueue;
use App\Actions\SyncQueue;
use App\Actions\UpdateUserQueue;
use App\Data\UserQueueData;
use App\Http\Requests\UserUpdateQueueRequest;
use App\Models\UserQueue;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

final class AdminFinishedQueueController extends Controller
{
    public function __invoke(int $id, MarkAsCompletedQueue $markAsCompletedQueue)
    {
        $markAsCompletedQueue->handle([
            'user_queue_id' => $id,
        ]);

        return redirect()->back();
    }

    public function index(): \Inertia\Response
    {
        return Inertia::render('admin/queues-completed', [
            'completedQueues' => UserQueueData::collect(UserQueue::completed()->limit(10)->orderBy('queue_number')->paginate(10)),
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
                queue_number: int,
                notes: string
            } $data
         */
        $data = $userUpdateQueueRequest->validated();

        $updateUserQueue->handle($data, $syncQueue);
        session()->flash('message.success', 'Queue has been updated!');
        Inertia::clearHistory();

        return redirect()->back();
    }
}
