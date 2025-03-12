<?php

use App\Http\Controllers\UserQueueController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/queue', function () {
    return Inertia::render('queue');
})->name('queue');

Route::post('queue', [UserQueueController::class, 'store'])->name('queue.store');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
