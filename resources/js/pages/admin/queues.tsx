import HeadingSmall from '@/components/heading-small';
import Pagination from '@/components/pagination';
import ManageSingleQueue from '@/dialogs/manage-single-queue';
import AppLayout from '@/layouts/app-layout';
import { PaginatedCollection } from '@/types/global';
import { Link, router, usePoll } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const Queues = ({ userQueues, firstInQueue }: { userQueues: PaginatedCollection<App.Data.UserQueueData>; firstInQueue: App.Data.UserQueueData }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    usePoll(2000, {
        only: ['userQueues'],
    });

    useEffect(() => {
        setTimeout(() => {
            router.reload({
                only: ['userQueue'],
            });
        }, 5000);

        setIsUpdated(false);
    }, [isUpdated]);

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
                    <div className="mb-8 rounded-lg p-6 shadow-md dark:bg-neutral-900/20">
                        <h2 className="mb-4 text-xl font-bold">First in Queue</h2>
                        <div className="flex items-end justify-between">
                            <div className="space-y-2">
                                <HeadingSmall title="Name" description={firstInQueue.name} />
                                <p>
                                    <strong>Request:</strong> {firstInQueue.message}
                                </p>
                                <p>
                                    <strong>Queue Number:</strong> {firstInQueue.row_number}
                                </p>
                            </div>

                            <Link
                                method="delete"
                                className={`w-20 rounded-md py-2 text-center text-white ${isButtonDisabled ? 'bg-red-300' : 'bg-red-500'}`}
                                href={route('admin.queue.destroy', firstInQueue.row_number)}
                                onClick={handleDoneClick}
                                disabled={isButtonDisabled}
                            >
                                <span className="flex items-center justify-center px-2">
                                    {isButtonDisabled && <LoaderCircle className="mx-2 h-4 w-4 animate-spin" />}
                                    Done
                                </span>
                            </Link>
                        </div>
                    </div>
                )}

                {userQueues.data.length > 0 ? (
                    <div className="overflow-hidden rounded-lg shadow-md dark:bg-neutral-900/20">
                        <h2 className="p-6 text-xl font-bold">Remaining Queue</h2>
                        <div className="responsive-table">
                            <table className="min-w-full">
                                <thead className="dark:bg-neutral-900/20">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Queue Number
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Prompt</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Notes</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Boost</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Upvotes</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {userQueues.data.map((userQueue: App.Data.UserQueueData) => (
                                        <tr key={userQueue.row_number} className={`${userQueue.is_working && 'bg-red-400'} `}>
                                            <td className="w-[100px] px-6 py-4 whitespace-nowrap">{userQueue.row_number}</td>
                                            <td className="w-[100px] px-6 py-4 whitespace-nowrap">{userQueue.name}</td>
                                            <td className="whitespace px-6 py-4">{userQueue.message}</td>
                                            <td className="px-6 py-4">{userQueue.admin_notes}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{userQueue.boost_count}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {userQueue.likes_count} / {userQueue.dislikes_count}
                                            </td>
                                            <td className="flex space-x-2 px-6 py-4 whitespace-nowrap">
                                                <Link
                                                    className="hover:bg-gray rounded-md bg-gray-400 px-2 py-1 text-sm text-white"
                                                    href={route('admin.queue.skip', userQueue.id)}
                                                    method="post"
                                                    as="button"
                                                    onClick={(e) => {
                                                        if (!window.confirm('Are you sure you want to skip?')) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    Skip
                                                </Link>
                                                <Link
                                                    className="hover:bg-gray rounded-md bg-green-400 px-2 py-1 text-sm text-white"
                                                    href={route('admin.queue.mark-completed', userQueue.id)}
                                                    method="get"
                                                    as="button"
                                                    onClick={(e) => {
                                                        if (!window.confirm('Are you sure you want to complete?')) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    Complete
                                                </Link>
                                                <Link
                                                    className="hover:bg-gray rounded-md border-1 bg-red-400 px-2 py-1 text-sm text-white"
                                                    method="get"
                                                    as="button"
                                                    href={route('admin.queue.working', userQueue.id)}
                                                >
                                                    Mark as active
                                                </Link>

                                                <Link
                                                    className="hover:bg-gray rounded-md border-1 bg-red-400 px-2 py-1 text-sm text-white"
                                                    method="get"
                                                    as="button"
                                                    href={route('admin.queue.not.working', userQueue.id)}
                                                >
                                                    Mark as not active
                                                </Link>

                                                {<ManageSingleQueue setIsUpdated={setIsUpdated} userQueue={userQueue} />}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <hr />
                        <div className="mt-4 mr-10 mb-2 flex justify-end">
                            <Pagination links={userQueues.links} />
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">No remaining data in the queue.</p>
                )}
            </div>
        </AppLayout>
    );
};

export default Queues;
