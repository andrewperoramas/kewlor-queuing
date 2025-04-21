import Pagination from '@/components/pagination';
import QueueCard from '@/components/queue-card';
import { Input } from '@/components/ui/input';
import AddRequestQueue from '@/dialogs/add-request-queue';
import GuestLayout from '@/layouts/guest-layout';
import { PaginatedCollection } from '@/types/global';
import { Head, router, usePage, usePoll } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function Home({
    userQueues,
    currentUserQueueNumber = 0,
}: {
    userQueues: PaginatedCollection<App.Data.UserQueueData>;
    currentUserQueueNumber: number;
}) {
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const currentPageRef = useRef(currentPage);
    currentPageRef.current = currentPage;

    usePoll(4000, () => {
        router.get(
            route('home'),
            {
                search: searchValue,
                page: currentPageRef.current,
            },
            {
                // preserveState: true,
                // replace: true,
                only: ['userQueues'],
            },
        );
    });

    const { flash }: any = usePage().props;

    // Handle flash messages
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

    // Debounce the search input and reset pagination to 1
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1); // Reset pagination to page 1
            router.get(
                route('home'),
                { search: searchValue, page: 1 }, // Ensure page is reset to 1
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue]);

    // Handle pagination changes
    const handlePageChange = (url: string) => {
        const urlObj = new URL(url, window.location.origin);
        const page = urlObj.searchParams.get('page') || '1'; // Extract page number from URL
        setCurrentPage(Number(page)); // Update currentPage state
        router.get(
            route('home'),
            { search: searchValue, page: Number(page) }, // Include search and page parameters
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    return (
        <GuestLayout guestName={''}>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex flex-col items-center justify-center gap-2 text-[#1b1b18]">
                <>
                    {currentUserQueueNumber > 0 && <>queue number: {currentUserQueueNumber}</>}

                    <div className="my-4 flex w-full justify-center md:my-0 md:justify-end">
                        <AddRequestQueue />
                    </div>

                    <div>
                        <Input
                            placeholder="Search username"
                            className="bg-white text-[#1b1b18]"
                            value={searchValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                        />
                    </div>

                    <>
                        <ul className="my-4 grid w-full gap-4">

                            {userQueues?.data?.length > 0 ? userQueues.data.map((userQueue) => <QueueCard userQueue={userQueue} />)  : <>
                                <p>User not found</p>
                            </>}
                        </ul>

                        <Pagination
                            links={userQueues?.links}
                            onPageChange={handlePageChange} // Pass the page change handler
                        />
                    </>
                </>
            </div>
        </GuestLayout>
    );
}
