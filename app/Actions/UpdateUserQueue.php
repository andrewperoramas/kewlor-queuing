<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\UserQueue;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

final class UpdateUserQueue
{
    public function handle(array $data): void
    {
        DB::transaction(function () use ($data): void {
            // Extract data
            $queueId = $data['id']; // The ID of the queue to update
            $newStatus = $data['status']; // The new status
            $newQueueNumber = $data['queue_number']; // The new queue number
            $adminNotes = $data['notes']; // Admin notes

            // Fetch the current queue
            $queue = UserQueue::find($queueId);

            // If the status is being marked as 'completed', set queue_number to 0
            if ($newStatus === 'completed') {
                $newQueueNumber = 0; // Force queue_number to 0 for completed items
            }

            // Fetch the current queue number before any changes
            $currentQueueNumber = $queue->queue_number;

            // Update the queue with the new status, notes, and queue number
            $queue->update([
                'status' => $newStatus,
                'admin_notes' => $adminNotes,
                'queue_number' => $newQueueNumber,
            ]);

            // If the new queue number is the same as the current one, no action is needed
            if ($newQueueNumber === $currentQueueNumber) {
                return;
            }

            // Validate the new queue number (if not completed)
            if ($newQueueNumber < 0) {
                throw new InvalidArgumentException('Queue number must be at least 0.');
            }

            // If the status is 'completed', adjust other queues to fill the gap
            if ($newStatus === 'completed') {
                // Decrement queue numbers for all queues after the current one
                DB::table('user_queues')
                    ->where('queue_number', '>', $currentQueueNumber)
                    ->decrement('queue_number');

                // Renumber all non-completed queues to ensure they are sequential
                $this->renumberQueues();

                return; // Exit after handling completed status
            }

            // If the status is not 'completed', handle queue number adjustment
            // Check if the new queue number is already taken
            $existingQueue = DB::table('user_queues')
                ->where('queue_number', $newQueueNumber)
                ->first();

            // If the new queue number is taken, move the existing queue to a temporary position
            if ($existingQueue) {
                // Move the existing queue to a temporary position (e.g., a very high number)
                $temporaryQueueNumber = DB::table('user_queues')->max('queue_number') + 1;
                DB::table('user_queues')
                    ->where('id', $existingQueue->id)
                    ->update(['queue_number' => $temporaryQueueNumber]);
            }

            // Adjust the positions of other queues
            if ($newQueueNumber >= $currentQueueNumber) {
                // Decrement queue numbers between the old and new positions
                DB::table('user_queues')
                    ->where('queue_number', '>', $currentQueueNumber)
                    ->where('queue_number', '<=', $newQueueNumber)
                    ->decrement('queue_number');
            } else {
                // Increment queue numbers between the new and old positions
                DB::table('user_queues')
                    ->where('queue_number', '>=', $newQueueNumber)
                    ->where('queue_number', '<', $currentQueueNumber)
                    ->increment('queue_number');
            }

            // Update the queue with the new queue number
            DB::table('user_queues')
                ->where('id', $queueId)
                ->update(['queue_number' => $newQueueNumber]);

            // If the new queue number was taken, move the existing queue back to its original position
            if ($existingQueue) {
                // Adjust the positions of other queues again
                DB::table('user_queues')
                    ->where('queue_number', '>', $newQueueNumber)
                    ->increment('queue_number');

                // Move the existing queue back to its original position
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
        // Fetch all non-completed queues, ordered by current queue_number
        $queues = DB::table('user_queues')
            ->where('status', '!=', 'completed')
            ->orderBy('queue_number')
            ->get();

        // Renumber the queues sequentially starting from 1
        foreach ($queues as $index => $queue) {
            DB::table('user_queues')
                ->where('id', $queue->id)
                ->update(['queue_number' => $index + 1]);
        }
    }
}
