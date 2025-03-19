<?php

declare(strict_types=1);

namespace App\Actions;

use App\Settings\LiveSetting;

final class SaveLiveSettings
{
    /**
     * @param array{
     *  date: string,
     *  schedule: string
     * } $data
     */
    public function handle(array $data, LiveSetting $liveSetting): void
    {
        $liveSetting->schedule = $data['schedule'];
        $liveSetting->date = $data['date'];
        $liveSetting->save();

    }
}
