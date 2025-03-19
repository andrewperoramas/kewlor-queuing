<?php

declare(strict_types=1);

namespace App\Models;

use App\UserQueueStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $name
 * @property string $email
 * @property int $queue_number
 * @property int $initial_queue_number
 * @property bool $is_boosted
 * @property string $message
 * @property string $admin_notes
 * @property string $status
 * @property-read \Illuminate\Database\Eloquent\Collection|UserQueueVote[] $user_queue_votes
 * @property-read int $likes_count
 * @property-read int $dislikes_count
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
final class UserQueue extends Model
{
    /** @use HasFactory<\Database\Factories\UserQueueFactory> */
    use HasFactory;

    /**
     * @param  Builder<UserQueue>  $query
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('queue_number', '>=', 1)
            ->where(function ($query): void {
                $query->where('status', UserQueueStatus::COMPLETED)
                    ->orWhere('status', UserQueueStatus::QUEUED);

            });
    }

    /**
     * @param  Builder<UserQueue>  $query
     */
    public function scopeCompleted(Builder $query): void
    {
        $query->where('status', UserQueueStatus::COMPLETED->value);
    }

    /**
     * @return HasMany<UserQueueVote>
     */
    public function user_queue_votes(): HasMany
    {
        return $this->hasMany(UserQueueVote::class);
    }

    public function getLikesCountAttribute()
    {
        return $this->user_queue_votes()->where('vote', 1)->count();
    }

    public function getDislikesCountAttribute()
    {
        return $this->user_queue_votes()->where('vote', -1)->count();
    }
}
