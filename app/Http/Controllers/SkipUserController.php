<?php

namespace App\Http\Controllers;

use App\Actions\SkipUserQueue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SkipUserController extends Controller
{
    public function __invoke(int $id, SkipUserQueue $skipUserQueue): RedirectResponse
    {
        $skipUserQueue->handle($id);

        session()->flash('success', 'User has been skipped.');
        return redirect()->back();
    }
}
