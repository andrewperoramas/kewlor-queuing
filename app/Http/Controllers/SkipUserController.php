<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\SkipUserQueue;
use App\Actions\SyncQueue;
use Illuminate\Http\RedirectResponse;

final class SkipUserController extends Controller
{
    public function __invoke(int $id, SkipUserQueue $skipUserQueue, SyncQueue $syncQueue): RedirectResponse
    {
        $skipUserQueue->handle($id, $syncQueue);

        session()->flash('success', 'User has been skipped.');

        return redirect()->back();
    }
}
