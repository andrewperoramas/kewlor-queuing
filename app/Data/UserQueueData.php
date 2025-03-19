<?php

declare(strict_types=1);

namespace App\Data;

use App\UserQueueStatus;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
final class UserQueueData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public int $queue_number,
        public int $initial_queue_number,
        public bool $is_boosted,
        public string $message,
        public ?string $admin_notes,
        public UserQueueStatus $status,

        // custom
        public int $likes_count,
        public int $dislikes_count,
    ) {}
}
