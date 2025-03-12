import { Deferred, Head, usePage, usePoll } from '@inertiajs/react';
import { useEffect } from 'react';

import AddRequestQueue from '@/forms/add-request-queue';
import AddUserQueue from '@/forms/add-user-queue';
import useUserStore from '@/stores/useUserQueueStore';
import toast from 'react-hot-toast';

export default function Home({
    userQueues = [],
    currentUserQueueNumber = 0,
}: {
    userQueues: App.Data.UserQueueData[];
    currentUserQueueNumber: number;
}) {
    const { user } = useUserStore();

    usePoll(2000, {
        only: ['userQueues', 'currentUserQueueNumber'],
        data: {
            email: user?.email,
        },
    });

    const { flash }: any = usePage().props;

    useEffect(() => {
        if (flash?.message?.success) {
            toast.success(flash.message.success, {
                duration: 2000,
            });
        }
    }, [flash]);

    useEffect(() => {
        if (flash?.message?.error) {
            toast.error(flash.message.error, {
                duration: 2000,
            });
        }
    }, [flash]);

    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8">
                {!user?.name ? (
                    <AddUserQueue />
                ) : (
                    <>
                        <h1>Hi {user.name}</h1>

                        {currentUserQueueNumber > 0 && <>queue number: {currentUserQueueNumber}</>}

                        <AddRequestQueue />

                        <Deferred data="userQueues" fallback={<div>Loading...</div>}>
                            <ul className="mt-4 grid w-1/2 gap-2">
                                {userQueues?.length > 0 &&
                                    userQueues?.map((userQueue, index) => (
                                        <li
                                            key={index}
                                            className="flex flex-col justify-between rounded-b border-gray-400 bg-white p-4 leading-normal shadow-lg lg:rounded-r lg:rounded-b-none lg:border-gray-400"
                                        >
                                            #{userQueue.queue_number} {userQueue.name}
                                        </li>
                                    ))}
                            </ul>
                        </Deferred>
                    </>
                )}
            </div>
        </>
    );
}
