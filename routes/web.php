<?php

use App\Http\Controllers\AdminQueueController;
use App\Http\Controllers\UserQueueController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [UserQueueController::class, 'index'])->name('home');
Route::post('queue', [UserQueueController::class, 'store'])->name('queue.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/admin/queues', [AdminQueueController::class, 'index']);
    Route::delete('/admin/queues/{queueNumber}', [AdminQueueController::class, 'destroy'])->name('admin.queue.destroy');

});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
