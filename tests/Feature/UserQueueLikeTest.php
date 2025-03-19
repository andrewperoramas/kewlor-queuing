<?php

declare(strict_types=1);

use App\Actions\AddUserQueue;
use App\Actions\DislikeQueue;
use App\Actions\LikeQueue;

use function Pest\Laravel\post;
use function PHPUnit\Framework\assertEquals;

it('can like a queue', function (): void {

    $userQueue = app(AddUserQueue::class)->handle([
        'name' => 'burat',
        'message' => 'hi there',
    ]);

    app(LikeQueue::class)->handle([
        'user_queue_id' => $userQueue->id,
        'ip_address' => '127.0.0.1',
    ]);

    assertEquals($userQueue->likes_count, 1);

    app(LikeQueue::class)->handle([
        'user_queue_id' => $userQueue->id,
        'ip_address' => '127.0.2.1',
    ]);

    assertEquals($userQueue->likes_count, 2);
});

it('can dislike a queue via routes', function (): void {

    $userQueue = app(AddUserQueue::class)->handle([
        'name' => 'burat',
        'message' => 'hi there',
    ]);

    post(route('queue.dislike'), [
        'user_queue_id' => $userQueue->id,
    ]);

    assertEquals($userQueue->dislikes_count, 1);
});

it('can like a queue  via routes', function (): void {

    $userQueue = app(AddUserQueue::class)->handle([
        'name' => 'burat',
        'message' => 'hi there',
    ]);

    post(route('queue.like'), [
        'user_queue_id' => $userQueue->id,
    ]);

    assertEquals($userQueue->likes_count, 1);
});

it('can dislike a queue', function (): void {

    $userQueue = app(AddUserQueue::class)->handle([
        'name' => 'burat',
        'message' => 'hi there',
    ]);

    app(DislikeQueue::class)->handle([
        'user_queue_id' => $userQueue->id,
        'ip_address' => '127.0.0.1',
    ]);

    assertEquals($userQueue->dislikes_count, 1);

    app(DislikeQueue::class)->handle([
        'user_queue_id' => $userQueue->id,
        'ip_address' => '127.0.2.1',
    ]);

    assertEquals($userQueue->dislikes_count, 2);
});
