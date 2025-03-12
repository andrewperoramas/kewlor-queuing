import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Deferred, Head, Link, router, useForm, usePage, usePoll, WhenVisible } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AddUserQueue from '@/forms/add-user-queue';
import useUserStore from '@/stores/useUserQueueStore';
import toast from 'react-hot-toast';
import AddRequestQueue from '@/forms/add-request-queue';
import AppLayout from '@/layouts/app-layout';

export default function Home({
    userQueues = [],
    currentUserQueueNumber = 0
}: {
        userQueues: App.Data.UserQueueData[]
        currentUserQueueNumber: number
    }) {

    const { user } = useUserStore();

    usePoll(2000, {
        only: ['userQueues', 'currentUserQueueNumber'],
        data: {
            email: user?.email
        }
    });


    const { flash }: any = usePage().props;

    useEffect(() => {
        if (flash?.message?.success) {

            toast.success(flash.message.success,
                {
                    duration: 2000
                });
        }
    }, [flash]);

    useEffect(() => {
        if (flash?.message?.error) {
            toast.error(flash.message.error, {
                duration: 2000
            });
        }
    }, [flash]);


    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>


            <div className="flex min-h-screen flex-col gap-2 items-center justify-center  bg-[#FDFDFC] p-6 text-[#1b1b18]  lg:p-8 ">
                {!user?.name ?
                <AddUserQueue /> :
                    <>
                        <h1>Hi {user.name}</h1>

                        {
                            currentUserQueueNumber > 0 &&
                            <>queue number: {currentUserQueueNumber}</>
                        }

                        <AddRequestQueue />

                        <Deferred data="userQueues" fallback={<div>Loading...</div>}>

                <ul className="w-full gap-2 grid">
                {

                            userQueues?.length > 0 &&
                                userQueues?.map((userQueue, index) => (
                                <li key={index} className=" shadow-lg border-gray-400  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">#{userQueue.queue_number} {userQueue.name}</li>
                                ))
                        }
                </ul>
                      </Deferred>




                    </>
                }
            </div>
        </>
    );
}
