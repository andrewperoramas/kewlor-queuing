<?php

namespace App\Http\Controllers;

use App\Actions\AddUserQueue;
use App\Data\UserQueueData;
use App\Http\Requests\UserQueueRequest;
use App\Models\UserQueue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserQueueController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate([
            'email' => 'email',
        ]);

        $queue_number = UserQueue::query()->active()->where('email', @$data['email'])->first()?->queue_number ?? 0;

        return inertia()->render('home', [
            'userQueues' => Inertia::defer(fn () => UserQueueData::collect(UserQueue::active()->limit(10)->orderBy('created_at')->paginate(10))),
            'currentUserQueueNumber' => $queue_number,

        ]);
    }

    public function store(UserQueueRequest $request, AddUserQueue $addUserQueue)
    {
        $addUserQueue->handle($request->validated());

        session()->flash('message.success', 'You have been added to the queue!');

        return redirect()->back();
    }
}
