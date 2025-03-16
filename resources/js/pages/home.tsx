import { Deferred, Head, router, usePage, usePoll } from '@inertiajs/react';
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
import GuestLayout from '@/layouts/guest-layout';

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
        <GuestLayout guestName={user?.name}>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex  flex-col items-center justify-center gap-2 bg-[#FDFDFC]  text-[#1b1b18] ">
                {!user?.name ? (
                    <AddUserQueue />
                ) : (
                    <>
                        { currentUserQueueNumber > 0 &&  <>queue number: {currentUserQueueNumber}</>}

                            <div className="w-full flex justify-end">

                            <AddRequestQueue />
                            </div>

                        <Deferred data="userQueues" fallback={<div className="h-[800px] w-full block"></div>}>
                                <>
                            <ul className="my-4 grid w-full gap-4">
                                {userQueues?.data?.length > 0 &&
                                    userQueues?.data.map((userQueue, index) => (
                                        <Card className="bg-white border-0" key={index}>
                                                <div className="grid md:grid-cols-3 grid-cols-1 items-center ">
                                                    <div className="pl-4 flex">
                                                        { userQueue.queue_number !== 0 ?
<Badge className="mr-2 bg-black text-white"> #{userQueue.initial_queue_number} </Badge> : <Badge className="mr-2" variant="destructive"> completed </Badge>
                                                        }

                                                        <span className="text-black">

                                                        {userQueue.name}
                                                        </span>
                                                    </div>



                                                    {
                                                        userQueue.message &&
                                                        <div className="pl-4">
                                                            <h3 className="mr-2 inline-block text-black mb-0.5 text-base font-medium">Message:</h3>
                                                            <p className="inline-block text-muted-foreground text-sm">{userQueue.message}</p>
                                                        </div>

                                                    }


                                                    {
                                                        userQueue.admin_notes &&
                                                        <div className="pl-4">
                                                            <h3 className="inline-block mr-2 text-black mb-0.5 text-base font-medium">Notes</h3>
                                                            <p className="inline-block text-muted-foreground text-sm">{userQueue.admin_notes}</p>
                                                        </div>

                                                    }
</div>

                                        </Card>
                                    ))}
                            </ul>


                          <Pagination links={userQueues?.links} />
                        </>
                        </Deferred>
                    </>
                )}
            </div>
        </GuestLayout>
    );
}
