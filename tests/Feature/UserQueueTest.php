<?php

use App\Actions\AddUserQueue;

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
        'name' =>  'Adichan',
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
        'email',
        'message',
    ]);
});
