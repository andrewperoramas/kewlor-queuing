<?php

namespace App\Http\Controllers;

use App\Actions\AddUserQueue;
use App\Data\UserQueueData;
use App\Http\Requests\UserQueueRequest;
use App\Models\UserQueue;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserQueueController extends Controller
{


    public function index(Request $request)
{
    $data = $request->validate([
        'email' => 'email',
    ]);

    $queue_number = UserQueue::query()->active()->where('email', @$data['email'])->first()?->queue_number ?? 0;
    $perPage = 10; // Set items per page

    // Fetch active and inactive queues separately
    $activeQueues = UserQueue::active()->orderBy('created_at');
    $inactiveQueues = UserQueue::completed()->orderBy('created_at');

    // Combine the queries using union
    $combinedQueues = $activeQueues->union($inactiveQueues);

    // Add a custom order to ensure active queues come first
        $combinedQueues = DB::table(DB::raw("({$combinedQueues->toSql()}) as combined"))
        ->mergeBindings($combinedQueues->getQuery())
        ->orderByRaw("CASE WHEN queue_number = 0 THEN 1 ELSE 0 END") // Move queue_number = 0 to the end
        ->orderByRaw("CASE WHEN status = 'completed' THEN 1 ELSE 0 END") // Move completed status to the end
        ->orderBy('queue_number')
        ->paginate($perPage);


    return inertia()->render('home', [
        'userQueues' => Inertia::defer(fn () => UserQueueData::collect($combinedQueues)),
        'currentUserQueueNumber' => $queue_number,
    ]);
}



    public function store(UserQueueRequest $request, AddUserQueue $addUserQueue)
    {
        $addUserQueue->handle($request->validated());

        session()->flash('message.success', 'You have been added to the queue!');

        return redirect()->back();
    }
}
