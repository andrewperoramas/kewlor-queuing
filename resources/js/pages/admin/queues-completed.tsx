import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { PaginatedCollection } from '@/types/global';
import {  router, usePoll } from '@inertiajs/react';
import Pagination from '@/components/pagination';
import ManageSingleQueue from '@/dialogs/manage-single-queue';

const QueuesCompleted = ({completedQueues}: { completedQueues: PaginatedCollection<App.Data.UserQueueData>  }) => {

    const [isUpdated, setIsUpdated] = useState(false);

    usePoll(2000, {
        only: ['completedQueues'],
    });

    useEffect(() => {

        setTimeout(() => {
            router.reload({
                only: ['completedQueues']
            })
        }, 5000)


        setIsUpdated(false);
    }, [isUpdated])

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {completedQueues.data.length > 0 ? (
                    <div className="overflow-hidden rounded-lg dark:bg-neutral-900/20 shadow-md">
                        <h2 className="p-6 text-xl font-bold">Completed Queue</h2>
                        <table className="min-w-full">
                            <thead className="dark:bg-neutral-900/20">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Request</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Queue Number</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {completedQueues.data.map((userQueue: App.Data.UserQueueData) => (
                                    <tr key={userQueue.queue_number}>
                                        <td className="px-6 py-4 whitespace-nowrap">{userQueue.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{userQueue.message}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{userQueue.queue_number}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{<ManageSingleQueue setIsUpdated={setIsUpdated} userQueue={userQueue}  />}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <hr/>
                        <div className="flex justify-end mr-10 mt-4 mb-2">
                            <Pagination links={completedQueues.links} />
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">No remaining data in the queue.</p>
                )}
            </div>
        </AppLayout>
    );
};

export default QueuesCompleted;
