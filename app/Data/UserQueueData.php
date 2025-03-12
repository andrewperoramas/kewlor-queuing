<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserQueueData extends Data
{
    public function __construct(
        public string $name,
        public int $queue_number,
        public string $message,
        public string $email,
    ) {}
}
