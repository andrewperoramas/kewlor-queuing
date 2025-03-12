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
            $lastQueueNumber = DB::table('user_queues')->where('queue_number', '>', 0)->max('queue_number');
            $newQueueNumber = $lastQueueNumber + 1;

            $data['queue_number'] = $newQueueNumber;
            $userQueue = UserQueue::create($data);
        });

        return $userQueue;
    }
}
