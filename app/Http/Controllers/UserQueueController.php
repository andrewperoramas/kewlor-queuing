<?php

namespace App\Http\Controllers;

use App\Actions\AddUserQueue;
use App\Http\Requests\UserQueueRequest;
use Illuminate\Http\Request;

class UserQueueController extends Controller
{
    public function store(UserQueueRequest $request, AddUserQueue $addUserQueue)
    {
        $addUserQueue->handle($request->validated());

        return redirect()->back()->with([
            'message.success' => 'Successfully added to queue',
        ]);
    }
}
