<?php

namespace App\Actions;

use App\Models\UserQueue;
use App\Settings\LiveSetting;
use App\UserQueueStatus;
use Illuminate\Support\Facades\DB;

class SkipUserQueue
{
    /**
    * @param array{
    *  id: int,
    * } $data
    */

    public function handle(int $id, SyncQueue $syncQueue): void
    {
        DB::transaction(function () use ($id, $syncQueue) {
            $userQueue = UserQueue::find($id);
            $userQueue->status = UserQueueStatus::SKIPPED;
            $userQueue->save();
            $syncQueue->handle();
        });

    }
}
