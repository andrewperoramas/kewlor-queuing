<?php

use App\Actions\AddUserQueue;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function PHPUnit\Framework\assertNotNull;

it('user can add itself to queue', function () {

    $addUserQueue = app(AddUserQueue::class);

    $createdUserQueue = $addUserQueue->handle([
        'name' => $name = 'Adichan',
        'email' => 'burig@yahoo.com',
        'message' => 'hi there',
    ]);

    assertNotNull($createdUserQueue);
});

it('user can add itself to queue via request', function () {

    $post = post('queue', [
        'name' => 'Adichan',
        'email' => 'burig@yahoo.com',
        'message' => 'hi there',
    ]);

    $post->assertSessionHas('message.success');
});

it('user queue form has validation', function () {

    $post = post('queue', [
    ]);

    $post->assertSessionHasErrors([
        'name',
        'message',
    ]);
});

it('cannot add duplicated email', function () {

    $post = post('queue', [
        'email' => 'burkasing@kerik.com',
        'name' => 'test',
        'message' => 'test',
    ]);

    $post = post('queue', [
        'email' => 'burkasing@kerik.com',
        'name' => 'test',
        'message' => 'test',
    ]);

    $post->assertSessionHasErrors([
        'email',
    ]);
});

it('queues correctly', function () {

    $post = post('queue', [
        'email' => 'test1@yahoo.com',
        'name' => 'test',
        'message' => 'test',
    ]);

    $post = post('queue', [
        'email' => 'test2@yahoo.com',
        'name' => 'test',
        'message' => 'test',
    ]);

    $post = post('queue', [
        'email' => 'test3@yahoo.com',
        'name' => 'test',
        'message' => 'test',
    ]);

    $user = User::factory()->create([

    ]);
    actingAs($user);

    $delete = delete('/admin/queues/1');
    $queues = get('/admin/queues')->assertInertia(fn (Assert $page) => $page
        ->has('userQueues.data', 2)
    );

    $delete = delete('/admin/queues/1');
    $queues = get('/admin/queues')->assertInertia(fn (Assert $page) => $page
        ->has('userQueues.data', 1)
    );

    $delete = delete('/admin/queues/1');
    $queues = get('/admin/queues')->assertInertia(fn (Assert $page) => $page
        ->has('userQueues.data', 0)
    );

});
