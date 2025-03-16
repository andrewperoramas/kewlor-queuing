<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class LiveSetting extends Settings
{
    public ?string $date;

    public ?string $schedule;

    public static function group(): string
    {
        return 'live';

    }
}
