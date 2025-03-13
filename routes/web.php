<?php

declare(strict_types=1);

use App\Http\Controllers\AdminFinishedQueueController;
use App\Http\Controllers\AdminQueueController;
use App\Http\Controllers\UserQueueController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [UserQueueController::class, 'index'])->name('home');
Route::post('queue', [UserQueueController::class, 'store'])->name('queue.store');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

    Route::get('/admin/queues', [AdminQueueController::class, 'index']);
    Route::post('/admin/queues', [AdminQueueController::class, 'update'])->name('admin.queue.update');
    Route::delete('/admin/queues/{queueNumber}', [AdminQueueController::class, 'destroy'])->name('admin.queue.destroy');

    Route::get('/admin/queues/completed', [AdminFinishedQueueController::class, 'index'])->name('admin.queue.completed');

});

Route::get('debug', function (): void {
    dd('debug');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
