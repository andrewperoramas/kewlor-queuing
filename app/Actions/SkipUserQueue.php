<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\UserQueue;
use App\UserQueueStatus;
use Illuminate\Support\Facades\DB;

final class SkipUserQueue
{
    /**
     * @param array{
     *  id: int,
     * } $data
     */
    public function handle(int $id, SyncQueue $syncQueue): void
    {
        DB::transaction(function () use ($id, $syncQueue): void {
            $userQueue = UserQueue::find($id);
            $userQueue->status = UserQueueStatus::SKIPPED;
            $userQueue->queue_number = 0;
            $userQueue->is_working = false;
            $userQueue->save();
            $syncQueue->handle();
        });

    }
}
