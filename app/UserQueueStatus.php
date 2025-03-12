<?php

namespace App;

enum UserQueueStatus: string
{
    case QUEUED = 'queued';
    case ARCHIVED = 'archived';
    case COMPLETED = 'completed';
}
