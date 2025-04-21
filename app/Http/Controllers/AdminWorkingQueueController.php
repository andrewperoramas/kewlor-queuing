<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\MarkAsWorkingQueue;
use App\Actions\RemoveUserQueue;
use App\Actions\SyncQueue;
use App\Actions\UpdateUserQueue;
use App\Data\UserQueueData;
use App\Http\Requests\UserUpdateQueueRequest;
use App\Models\UserQueue;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

final class AdminWorkingQueueController extends Controller
{

    public function __invoke(int $id, MarkAsWorkingQueue $markAsWorkingQueue): RedirectResponse
    {
        $markAsWorkingQueue->handle([
            'user_queue_id' => $id
        ]);

        return redirect()->back();
    }

}
