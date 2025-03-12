<?php

it('user can add itself to queue', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
