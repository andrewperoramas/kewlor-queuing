<?php

declare(strict_types=1);

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class UserQueueData extends Data
{
    public function __construct(
        public string $name,
        public int $queue_number,
        public string $email,
        public string $message,
    ) {}
}
