<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\RemoveUserQueue;
use App\Actions\UpdateUserQueue;
use App\Data\UserQueueData;
use App\Http\Requests\UserUpdateQueueRequest;
use App\Models\UserQueue;

final class AdminQueueController extends Controller
{
    public function index()
    {
        return inertia()->render('admin/queues', [
            'userQueues' => UserQueueData::collect(UserQueue::active()->limit(10)->orderBy('queue_number')->paginate(10)),
            'completedQueues' => UserQueueData::collect(UserQueue::completed()->limit(10)->orderBy('queue_number')->paginate(10)),
            'firstInQueue' => UserQueueData::optional(UserQueue::active()->orderBy('queue_number')->first()),
        ]);
    }

    public function destroy(int $queueNumber, RemoveUserQueue $removeUserQueue)
    {
        $removeUserQueue->handle($queueNumber);
        session()->flash('message.success', 'Request has been removed!');

        return redirect()->back();
    }

    public function update(UserUpdateQueueRequest $userUpdateQueueRequest, UpdateUserQueue $updateUserQueue)
    {
        $updateUserQueue->handle($userUpdateQueueRequest->validated());
        session()->flash('message.success', 'Queue has been updated!');
        inertia()->clearHistory();

        return redirect()->back();
    }
}
