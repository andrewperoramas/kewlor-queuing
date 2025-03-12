import AppLayout from '@/layouts/app-layout';
import { PaginatedCollection } from '@/types/global';
import { Link, usePoll } from '@inertiajs/react';

const Queues = ({ userQueues }: { userQueues: PaginatedCollection<App.Data.AdminQueueData> }) => {
    const firstInQueue = userQueues.data.length > 0 ? userQueues.data[0] : null;

    const remainingQueues = userQueues.data.length > 1 ? userQueues.data.slice(1) : [];

    usePoll(2000, {
        only: ['userQueues'],
    });

    return (
        <AppLayout>
            {firstInQueue && (
                <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-bold">First in Queue</h2>
                    <div className="flex items-end justify-between">
                        <div className="space-y-2">
                            <p>
                                <strong>Name:</strong> {firstInQueue.name}
                            </p>
                            <p>
                                <strong>Request:</strong> {firstInQueue.message}
                            </p>
                            <p>
                                <strong>Queue Number:</strong> {firstInQueue.queue_number}
                            </p>
                        </div>

                        <Link
                            method="delete"
                            className="w-20 rounded-md bg-red-500 py-2 text-center text-white"
                            href={route('admin.queue.destroy', firstInQueue.queue_number)}
                        >
                            Done
                        </Link>
                    </div>
                </div>
            )}

            {remainingQueues.length > 0 ? (
                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    <h2 className="p-6 text-xl font-bold">Remaining Queue</h2>
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Request</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Queue Number</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {remainingQueues.map((userQueue: App.Data.AdminQueueData) => (
                                <tr key={userQueue.queue_number}>
                                    <td className="px-6 py-4 whitespace-nowrap">{userQueue.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{userQueue.message}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{userQueue.queue_number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No remaining data in the queue.</p>
            )}
        </AppLayout>
    );
};

export default Queues;
