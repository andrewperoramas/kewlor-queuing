<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\UserQueue;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

final class UpdateUserQueue
{
    /**
     * @param array{
     *     id: int,
     *     status: string,
     *     queue_number: int,
     *     notes: string
     * } $data
     */
    public function handle(array $data, SyncQueue $syncQueue): void
    {
        DB::transaction(function () use ($data, $syncQueue): void {
            $queueId = $data['id'];
            $newStatus = $data['status'];
            $boostCount = $data['boost_count'];
            $newQueueNumber = $data['queue_number'];
            $message = $data['message'];
            $newInitialQueueNumber = $data['initial_queue_number'];
            $adminNotes = $data['notes'];

            $queue = UserQueue::find($queueId);

            if (! $queue) {
                throw new InvalidArgumentException('Queue not found.');
            }

            if ($newStatus === 'completed') {
                $newQueueNumber = 0;
                $queue->update([
                    'is_working' => false,
                ]);
            }

            $currentQueueNumber = $queue->queue_number;

            $queue->update([
                'status' => $newStatus,
                'admin_notes' => $adminNotes,
                'message' => $message,
                'boost_count' => $boostCount,
                'initial_queue_number' => $newInitialQueueNumber,
            ]);

            if ($newQueueNumber === $currentQueueNumber) {
                return;
            }

            if ($newQueueNumber < 0) {
                throw new InvalidArgumentException('Queue number must be at least 0.');
            }

            if ($newStatus === 'completed') {
                /* DB::table('user_queues') */
                /*     ->where('queue_number', '>', $currentQueueNumber) */
                /*     ->decrement('queue_number'); */

                $syncQueue->handle();

                return;
            }

            $existingQueue = DB::table('user_queues')
                ->where('queue_number', $newQueueNumber)
                ->first();

            if ($existingQueue) {
                $maxQueueNumber = (int) (DB::table('user_queues')->max('queue_number'));
                $temporaryQueueNumber = $maxQueueNumber;
                DB::table('user_queues')
                    ->where('id', $existingQueue->id)
                    ->update(['queue_number' => $temporaryQueueNumber]);
            }

            if ($newQueueNumber >= $currentQueueNumber) {
                DB::table('user_queues')
                    ->where('queue_number', '>', $currentQueueNumber)
                    ->where('queue_number', '<=', $newQueueNumber)
                    ->decrement('queue_number');
            } else {
                DB::table('user_queues')
                    ->where('queue_number', '>=', $newQueueNumber)
                    ->where('queue_number', '<', $currentQueueNumber)
                    ->increment('queue_number');
            }

            DB::table('user_queues')
                ->where('id', $queueId)
                ->update(['queue_number' => $newQueueNumber]);

            if ($existingQueue) {
                DB::table('user_queues')
                    ->where('queue_number', '>', $newQueueNumber)
                    ->increment('queue_number');

                DB::table('user_queues')
                    ->where('id', $existingQueue->id)
                    ->update(['queue_number' => $newQueueNumber + 1]);
            }

            $syncQueue->handle();

        });
    }
}
