<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\UserQueue;
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

        $queues = UserQueue::showOnLive()
            ->select('user_queues.id', 'user_queues.name', 'user_queues.status', 'user_queues.created_at', 'boost_count', 'message', 'initial_queue_number', 'queue_number', 'admin_notes',
                DB::raw('- queue_number +  (SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = 1) + -(SELECT COUNT(*) FROM user_queue_votes WHERE user_queue_votes.user_queue_id = user_queues.id AND user_queue_votes.vote = -1) + boost_count  AS total_points'),

            )
            ->orderByDesc('total_points')
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
