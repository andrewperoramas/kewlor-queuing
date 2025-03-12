<?php

namespace App\Models;

use App\UserQueueStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserQueue extends Model
{
    /** @use HasFactory<\Database\Factories\UserQueueFactory> */
    use HasFactory;

    public function scopeActive($query)
    {
        $query->where('queue_number', '>=', 1);
    }

    public function scopeCompleted($query)
    {
        $query->where('status', UserQueueStatus::COMPLETED->value);
    }

}
