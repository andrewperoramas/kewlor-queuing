<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\UserQueue;
use Illuminate\Support\Facades\DB;

final class LikeQueue
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
            /** @var UserQueue $userQueue */
            $userQueue = UserQueue::find($data['user_queue_id']);
            $userQueue->user_queue_votes()->where('ip_address', $data['ip_address'])->delete();
            $userQueue->user_queue_votes()->create([
                'vote' => 1,
                'ip_address' => $data['ip_address'],
            ]);

        });

    }
}
