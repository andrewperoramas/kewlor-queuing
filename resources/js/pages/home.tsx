import { Deferred, Head, usePage, usePoll } from '@inertiajs/react';
import { useEffect } from 'react';

import AddRequestQueue from '@/dialogs/add-request-queue';
import AddUserQueue from '@/forms/add-user-queue';
import useUserStore from '@/stores/useUserQueueStore';
import toast from 'react-hot-toast';
import Pagination from '@/components/pagination';
import { PaginatedCollection } from '@/types/global';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeadingSmall from '@/components/heading-small';

export default function Home({
    userQueues ,
    currentUserQueueNumber = 0,
}: {
    userQueues: PaginatedCollection<App.Data.UserQueueData>;
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

                        <Deferred data="userQueues" fallback={<div className="h-[800px] w-full block"></div>}>
                                <>
                            <ul className="my-4 grid w-1/3 gap-4">
                                {userQueues?.data?.length > 0 &&
                                    userQueues?.data.map((userQueue, index) => (
                                        <Card key={index}>
                                                    <div className="pl-4 flex">
                                                        { userQueue.queue_number !== 0 ?
<Badge className="mr-2"> #{userQueue.queue_number} </Badge> : <Badge className="mr-2" variant="destructive"> completed </Badge>
                                                        }

                                                        {userQueue.name}
                                                    </div>

                                                    <hr/>

                                                    {
                                                        userQueue.admin_notes &&
                                                        <div className="pl-4">
                                                            <HeadingSmall title="Notes" description={userQueue.admin_notes} />
                                                        </div>

                                                    }

                                                    {
                                                        userQueue.message &&
                                                        <div className="pl-4">
                                                            <HeadingSmall title="Message:" description={userQueue.message} />
                                                        </div>

                                                    }


                                        </Card>
                                    ))}
                            </ul>


                          <Pagination links={userQueues?.links} />
                        </>
                        </Deferred>
                    </>
                )}
            </div>
        </>
    );
}
