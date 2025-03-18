<?php

declare(strict_types=1);

use App\Actions\AddUserQueue;
use App\Actions\SkipUserQueue;
use App\Models\User;
use App\Models\UserQueue;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function PHPUnit\Framework\assertNotNull;

it('user can add itself to queue', function (): void {

    $addUserQueue = app(AddUserQueue::class);

    $createdUserQueue = $addUserQueue->handle([
        'name' => $name = 'Adichan',
        'email' => 'burig@yahoo.com',
        'message' => 'hi there',
    ]);

    assertNotNull($createdUserQueue);
});

it('user can add itself to queue via request', function (): void {

    $post = post('queue', [
        'name' => 'Adichan',
        'email' => 'burig@yahoo.com',
        'message' => 'hi there',
    ]);

    $post->assertSessionHas('message.success');
});

it('user queue form has validation', function (): void {

    $post = post('queue', [
    ]);

    $post->assertSessionHasErrors([
        'name',
        'message',
    ]);
});

it('cannot add duplicated email', function (): void {

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

it('queues correctly', function (): void {

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
    $queues = get('/admin/queues')->assertInertia(fn (Assert $page): Illuminate\Testing\Fluent\AssertableJson => $page
        ->has('userQueues.data', 2)
    );

    $delete = delete('/admin/queues/1');
    $queues = get('/admin/queues')->assertInertia(fn (Assert $page): Illuminate\Testing\Fluent\AssertableJson => $page
        ->has('userQueues.data', 1)
    );

    $delete = delete('/admin/queues/1');
    $queues = get('/admin/queues')->assertInertia(fn (Assert $page): Illuminate\Testing\Fluent\AssertableJson => $page
        ->has('userQueues.data', 0)
    );

});

test('user skipped can register again', function () {

    $post = post('queue', [
        'email' => 'test2@yahoo.com',
        'name' => 'test',
        'message' => 'test',
    ]);
    /* dd($post->assertSessionHas('message.success')); */

    $app = app(SkipUserQueue::class);

    $app->handle(UserQueue::latest()->first()->id);

    $post = post('queue', [
        'email' => 'test2@yahoo.com',
        'name' => 'test',
        'message' => 'test',
    ]);


$post->assertSessionHas('message.success');


});
