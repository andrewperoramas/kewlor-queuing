import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Queue() {

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>


            <div className="flex min-h-screen flex-col gap-2  bg-[#FDFDFC] p-6 text-[#1b1b18]  lg:p-8 ">

                <Button variant="secondary" className="w-20">Join</Button>


                <ul className="w-full gap-2 grid">
                    <li className=" shadow-lg border-gray-400  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">#1 Can coffee make you a better developer?</li>
                    <li className=" shadow-lg border-gray-400  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">#1 Can coffee make you a better developer?</li>
                    <li className=" shadow-lg border-gray-400  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">#1 Can coffee make you a better developer?</li>
                </ul>
            </div>
        </>
    );
}
