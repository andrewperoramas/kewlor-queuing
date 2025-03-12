<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class AdminQueueData extends Data
{
    public function __construct(
        public string $name,
        public int $queue_number,
        public string $email,
        public string $message,
    ) {}
}
