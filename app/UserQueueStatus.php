<?php

declare(strict_types=1);

namespace App;

enum UserQueueStatus: string
{
    case QUEUED = 'queued';
    case ARCHIVED = 'archived';
    case COMPLETED = 'completed';
}
