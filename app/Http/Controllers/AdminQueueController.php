<?php

namespace App\Http\Controllers;

use App\Actions\RemoveUserQueue;
use App\Data\AdminQueueData;
use App\Models\UserQueue;

class AdminQueueController extends Controller
{
    public function index()
    {
        return inertia()->render('admin/queues', [
            'userQueues' => AdminQueueData::collect(UserQueue::active()->limit(10)->orderBy('queue_number')->paginate(10)),
        ]);
    }

    public function destroy(int $queueNumber, RemoveUserQueue $removeUserQueue)
    {
        $removeUserQueue->handle($queueNumber);
        session()->flash('message.success', 'Request has been removed!');

        return redirect()->back();
    }
}
