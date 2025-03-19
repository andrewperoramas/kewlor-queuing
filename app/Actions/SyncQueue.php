<?php

declare(strict_types=1);

namespace App\Actions;

use App\UserQueueStatus;
use Illuminate\Support\Facades\DB;

final class SyncQueue
{
    /**
     * @param array{
     *  date: string,
     *  schedule: string
     * } $data
     */
    public function handle(): void
    {
        $queues = DB::table('user_queues')
            ->where('status', UserQueueStatus::QUEUED)
            ->orderBy('queue_number')
            ->get();

        /** @var object{id: int, queue_number: int} $queue */
        foreach ($queues as $index => $queue) {
            DB::table('user_queues')
                ->where('id', $queue->id)
                ->update(['queue_number' => $index + 1]);
        }

    }
}
