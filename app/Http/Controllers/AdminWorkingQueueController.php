<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\MarkAsNotWorkingQueue;
use App\Actions\MarkAsWorkingQueue;
use Illuminate\Http\RedirectResponse;

final class AdminWorkingQueueController extends Controller
{
    public function __invoke(int $id, MarkAsWorkingQueue $markAsWorkingQueue): RedirectResponse
    {
        $markAsWorkingQueue->handle([
            'user_queue_id' => $id,
        ]);

        return redirect()->back();
    }

    public function notWorking(int $id, MarkAsNotWorkingQueue $markAsNotWorkingQueue): RedirectResponse
    {
        $markAsNotWorkingQueue->handle([
            'user_queue_id' => $id,
        ]);

        return redirect()->back();
    }
}
