<?php

namespace App\Data;

use App\PuppyStatus;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserQueueData extends Data
{
    public function __construct(
        public string $name,
        public int $queue_number,
        public string $email,
    ) {

    }
}

