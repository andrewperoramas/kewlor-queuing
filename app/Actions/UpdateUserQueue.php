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
    public function handle(array $data): void
    {
        DB::transaction(function () use ($data): void {
            $queueId = $data['id'];
            $newStatus = $data['status'];
            $newQueueNumber = $data['queue_number'];
            $adminNotes = $data['notes'];

            $queue = UserQueue::find($queueId);

            if (! $queue) {
                throw new InvalidArgumentException('Queue not found.');
            }

            if ($newStatus === 'completed') {
                $newQueueNumber = 0;
            }

            $currentQueueNumber = $queue->queue_number;

            $queue->update([
                'status' => $newStatus,
                'admin_notes' => $adminNotes,
                'queue_number' => $newQueueNumber,
            ]);

            if ($newQueueNumber === $currentQueueNumber) {
                return;
            }

            if ($newQueueNumber < 0) {
                throw new InvalidArgumentException('Queue number must be at least 0.');
            }

            if ($newStatus === 'completed') {
                DB::table('user_queues')
                    ->where('queue_number', '>', $currentQueueNumber)
                    ->decrement('queue_number');

                $this->renumberQueues();

                return;
            }

            /** @var object{id: int, queue_number: int}|null $existingQueue */
            $existingQueue = DB::table('user_queues')
                ->where('queue_number', $newQueueNumber)
                ->first();

            if ($existingQueue) {
                $maxQueueNumber = (int) (DB::table('user_queues')->max('queue_number'));
                $temporaryQueueNumber = (int) $maxQueueNumber;
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

            $this->renumberQueues();
        });
    }

    /**
     * Renumber all non-completed queues to ensure they are sequential.
     */
    private function renumberQueues(): void
    {
        $queues = DB::table('user_queues')
            ->where('status', '!=', 'completed')
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
