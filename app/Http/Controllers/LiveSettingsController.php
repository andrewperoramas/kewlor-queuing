<?php

namespace App\Http\Controllers;

use App\Actions\SaveLiveSettings;
use App\Settings\LiveSetting;
use Illuminate\Http\Request;

class LiveSettingsController extends Controller
{
    public function update(Request $request, LiveSetting $liveSetting, SaveLiveSettings $saveLiveSettings)
    {

        $data = $request->validate([
            'date' => 'string',
            'schedule' => 'string'
        ]);


        $saveLiveSettings->handle($data, $liveSetting);
    }
}
