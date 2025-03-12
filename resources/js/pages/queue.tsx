import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';

export default function Queue() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col gap-2 bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8">
                <Button variant="secondary" className="w-20">
                    Join
                </Button>

                <ul className="grid w-full gap-2">
                    <li className="flex flex-col justify-between rounded-b border-gray-400 bg-white p-4 leading-normal shadow-lg lg:rounded-r lg:rounded-b-none lg:border-gray-400">
                        #1 Can coffee make you a better developer?
                    </li>
                    <li className="flex flex-col justify-between rounded-b border-gray-400 bg-white p-4 leading-normal shadow-lg lg:rounded-r lg:rounded-b-none lg:border-gray-400">
                        #1 Can coffee make you a better developer?
                    </li>
                    <li className="flex flex-col justify-between rounded-b border-gray-400 bg-white p-4 leading-normal shadow-lg lg:rounded-r lg:rounded-b-none lg:border-gray-400">
                        #1 Can coffee make you a better developer?
                    </li>
                </ul>
            </div>
        </>
    );
}
