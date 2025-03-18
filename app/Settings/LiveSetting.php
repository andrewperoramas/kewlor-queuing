<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class LiveSetting extends Settings
{
    public ?string $date = null;

    public ?string $schedule = null;

    public static function group(): string
    {
        return 'live';

    }
}
