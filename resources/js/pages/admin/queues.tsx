import { useState, useEffect } from 'react';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { PaginatedCollection } from '@/types/global';
import { Link, usePoll } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const Queues = ({ userQueues }: { userQueues: PaginatedCollection<App.Data.AdminQueueData> }) => {
    const firstInQueue = userQueues.data.length > 0 ? userQueues.data[0] : null;
    const remainingQueues = userQueues.data.length > 1 ? userQueues.data.slice(1) : [];
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    usePoll(2000, {
        only: ['userQueues'],
    });

    const handleDoneClick = () => {
        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 3000);
    };

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {firstInQueue && (
                    <div className="mb-8 rounded-lg dark:bg-neutral-900/20 p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">First in Queue</h2>
                        <div className="flex items-end justify-between">
                            <div className="space-y-2">
                                <HeadingSmall title="Name" description={firstInQueue.name} />
                                <p>
                                    <strong>Request:</strong> {firstInQueue.message}
                                </p>
                                <p>
                                    <strong>Queue Number:</strong> {firstInQueue.queue_number}
                                </p>
                            </div>

                            <Link
                                method="delete"
                                className={`w-20 rounded-md py-2 text-center text-white ${
                                    isButtonDisabled ? 'bg-red-300' : 'bg-red-500'
                                }`}
                                href={route('admin.queue.destroy', firstInQueue.queue_number)}
                                onClick={handleDoneClick}
                                disabled={isButtonDisabled}
                            >

                                <span className="flex items-center justify-center px-2">
                                {isButtonDisabled && <LoaderCircle className="h-4 mx-2 w-4 animate-spin" />}
                                Done
                                </span>
                            </Link>
                        </div>
                    </div>
                )}

                {remainingQueues.length > 0 ? (
                    <div className="overflow-hidden rounded-lg dark:bg-neutral-900/20 shadow-md">
                        <h2 className="p-6 text-xl font-bold">Remaining Queue</h2>
                        <table className="min-w-full">
                            <thead className="dark:bg-neutral-900/20">
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
            </div>
        </AppLayout>
    );
};

export default Queues;
