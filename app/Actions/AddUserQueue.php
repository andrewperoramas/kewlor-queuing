<?php

namespace App\Actions;

use App\Models\UserQueue;
use Illuminate\Support\Facades\DB;

class AddUserQueue
{
    public function handle($data): ?UserQueue
    {
        $userQueue = null;

        DB::transaction(function () use ($data, &$userQueue) {
            $userQueue =  UserQueue::create($data);
        });

        return $userQueue;
    }
}
