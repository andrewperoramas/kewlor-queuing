<?php

declare(strict_types=1);

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

final class LiveSetting extends Settings
{
    public ?string $date = null;

    public ?string $schedule = null;

    public static function group(): string
    {
        return 'live';

    }
}
