<?php

declare(strict_types=1);

namespace App\Models;

use App\UserQueueStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class UserQueue extends Model
{
    /** @use HasFactory<\Database\Factories\UserQueueFactory> */
    use HasFactory;

    public function scopeActive($query): void
    {
        $query->where('queue_number', '>=', 1);
    }

    public function scopeCompleted($query): void
    {
        $query->where('status', UserQueueStatus::COMPLETED->value);
    }
}
