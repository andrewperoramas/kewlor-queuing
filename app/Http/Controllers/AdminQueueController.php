<?php

namespace App\Http\Controllers;

use App\Actions\AddUserQueue;
use App\Actions\RemoveUserQueue;
use App\Data\AdminQueueData;
use App\Data\UserQueueData;
use App\Http\Requests\UserQueueRequest;
use App\Models\UserQueue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminQueueController extends Controller
{

    public function index()
    {
        return inertia()->render('admin/queues', [
            'userQueues' => AdminQueueData::collect(UserQueue::active()->limit(10)->orderBy('created_at')->paginate(10)),
        ]);
    }

    public function destroy(int $queueNumber, RemoveUserQueue $removeUserQueue)
    {
        $removeUserQueue->handle($queueNumber);
        session()->flash('message.success', 'Request has been removed!');
        return redirect()->back();
    }

}
