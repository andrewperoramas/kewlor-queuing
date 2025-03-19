<?php

declare(strict_types=1);

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('live.date', '3-12-2025');
        $this->migrator->add('live.schedule', '8PM - 9PM PST');
    }
};
