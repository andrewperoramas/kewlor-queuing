<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\RemoveUserQueue;
use App\Actions\UpdateUserQueue;
use App\Data\UserQueueData;
use App\Http\Requests\UserUpdateQueueRequest;
use App\Models\UserQueue;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class AdminQueueController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/queues', [
            'userQueues' => UserQueueData::collect(UserQueue::active()->limit(10)->orderBy('queue_number')->paginate(10)),
            'completedQueues' => UserQueueData::collect(UserQueue::completed()->limit(10)->orderBy('queue_number')->paginate(10)),
            'firstInQueue' => UserQueueData::optional(UserQueue::active()->orderBy('queue_number')->first()),
        ]);
    }

    public function destroy(int $queueNumber, RemoveUserQueue $removeUserQueue): RedirectResponse
    {
        $removeUserQueue->handle($queueNumber);
        session()->flash('message.success', 'Request has been removed!');

        return redirect()->back();
    }

    public function update(UserUpdateQueueRequest $userUpdateQueueRequest, UpdateUserQueue $updateUserQueue): RedirectResponse
    {
        /**
            @var array{
                id: int,
                status: string,
                queue_number: int,
                notes: string
                initial_queue_number: int,
                is_boosted: boolean
            } $data
         */
        $data = $userUpdateQueueRequest->validated();
        $updateUserQueue->handle($data);
        session()->flash('message.success', 'Queue has been updated!');
        Inertia::clearHistory();

        return redirect()->back();
    }
}
