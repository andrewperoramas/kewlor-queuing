<?php

namespace App\Actions;

use Illuminate\Support\Facades\DB;

class RemoveUserQueue
{
    public function handle(int $queueNumber): void
    {
        DB::transaction(function () use ($queueNumber): void {
            // Check if the queue_number exists
            $exists = DB::table('user_queues')
                ->where('queue_number', $queueNumber)
                ->exists();

            // If the record exists, proceed with the deletion and update
            if ($exists) {
                // Decrement queue_numbers for records with higher queue_numbers
                DB::table('user_queues')
                    ->where('queue_number', '>=', $queueNumber)
                    ->decrement('queue_number');

                inertia()->clearHistory();

                // Delete the record with the specified queue_number
                /* DB::table('user_queues') */
                /*     ->where('queue_number', $queueNumber) */
                /*     ->delete(); */
            }
        });
    }
}
