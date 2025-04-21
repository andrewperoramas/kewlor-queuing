<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\UserQueue;
use App\UserQueueStatus;
use Illuminate\Support\Facades\DB;

final class MarkAsCompletedQueue
{
    /**
     * @param array{
     *  ip_address: string,
     *  user_queue_id: int,
     * } $data
     */
    public function handle(array $data): void
    {
        DB::transaction(function () use ($data): void {
            $userQueue = UserQueue::find($data['user_queue_id']);
            $userQueue->update(['is_working' => false, 'status' => UserQueueStatus::COMPLETED]);
        });

    }
}
