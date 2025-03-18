<?php

namespace App\Actions;

use App\Models\UserQueue;
use App\Settings\LiveSetting;
use App\UserQueueStatus;

class SkipUserQueue
{
    /**
    * @param array{
    *  id: int,
    * } $data
    */

    public function handle(int $id): void
    {
        $userQueue = UserQueue::find($id);
        $userQueue->status = UserQueueStatus::SKIPPED;
        $userQueue->save();
    }
}
