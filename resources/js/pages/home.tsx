import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AddUserQueue from '@/forms/add-user-queue';
import useUserStore from '@/stores/useUserQueueStore';
import AddRequestQueue from '@/forms/add-request-queue';

export default function Home() {

    const { user } = useUserStore();
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

                        <AddRequestQueue />

                <ul className="w-full gap-2 grid">
                    <li className=" shadow-lg border-gray-400  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">#1 Can coffee make you a better developer?</li>
                    <li className=" shadow-lg border-gray-400  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">#1 Can coffee make you a better developer?</li>
                    <li className=" shadow-lg border-gray-400  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">#1 Can coffee make you a better developer?</li>
                </ul>

                    </>
                }
            </div>
        </>
    );
}
