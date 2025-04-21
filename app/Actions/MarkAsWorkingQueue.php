<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\UserQueue;
use Illuminate\Support\Facades\DB;

final class MarkAsWorkingQueue
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
            /* $userQueue = UserQueue::where('is_working', true)->get()->each(function ($userQueue) { */
                /* $userQueue->update(['is_working' => false]); */
            /* }); */

            $userQueue = UserQueue::find($data['user_queue_id']);
            $userQueue->update(['is_working' => true]);
        });

    }
}
