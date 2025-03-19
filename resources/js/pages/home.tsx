import { Head, Link, router, usePage, usePoll } from '@inertiajs/react';
import React, { useEffect, useState, useRef } from 'react';
import AddRequestQueue from '@/dialogs/add-request-queue';
import toast from 'react-hot-toast';
import Pagination from '@/components/pagination';
import { PaginatedCollection } from '@/types/global';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GuestLayout from '@/layouts/guest-layout';
import { FlameIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Home({
    userQueues,
    currentUserQueueNumber = 0,
}: {
    userQueues: PaginatedCollection<App.Data.UserQueueData>;
    currentUserQueueNumber: number;
}) {
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Use a ref to store the latest value of currentPage
    const currentPageRef = useRef(currentPage);
    currentPageRef.current = currentPage;

    // Use usePoll to periodically fetch data
    usePoll(4000, () => {
        router.get(
            route('home'),
            {
                search: searchValue,
                page: currentPageRef.current, // Use the ref to get the latest value of currentPage
            },
            {
                preserveState: true,
                replace: true,
                only: ['userQueues'],
            }
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
                }
            );
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue]);

    // Handle pagination changes
    const handlePageChange = (url: string) => {
        const urlObj = new URL(url, window.location.origin);
        const page = urlObj.searchParams.get("page") || "1"; // Extract page number from URL
        setCurrentPage(Number(page)); // Update currentPage state
        router.get(
            route('home'),
            { search: searchValue, page: Number(page) }, // Include search and page parameters
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <GuestLayout guestName={""}>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex flex-col items-center justify-center gap-2 bg-[#FDFDFC] text-[#1b1b18]">
                <>
                    {currentUserQueueNumber > 0 && <>queue number: {currentUserQueueNumber}</>}

                    <div className="w-full flex justify-end">
                        <AddRequestQueue />
                    </div>

                    <div>
                        <Input
                            placeholder="Search username"
                            value={searchValue} // Controlled input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                        />
                    </div>

                    <>
                        <ul className="my-4 grid w-full gap-4">
                            {userQueues?.data?.length > 0 &&
                                userQueues.data.map((userQueue, index) => (
                                    <Card
                                        className={`
                                            relative
                                            ${userQueue.is_boosted && 'bg-violet-500'}
                                            ${userQueue.status === 'completed' ? 'bg-green-200' : userQueue.status === 'skipped' && userQueue.queue_number === 0 ? 'bg-red-200 text-white' : 'bg-white'}
                                            border-0
                                        `}
                                        key={index}
                                    >

                                        {userQueue.status ==='skipped' && userQueue.queue_number === 0 && (
                                            <div className="absolute bottom-0 right-0 mr-10 font-extrabold font-open px-4 bg-red-300 text-white text-red-500">
                                                SKIPPED
                                            </div>
                                        )}

                                        {userQueue.queue_number !== 0 && (
                                            <div className="absolute bottom-0 right-0 mr-10 font-extrabold font-open px-4 bg-black text-white text-red-500">
                                                QUEUE NUMBER: {userQueue.queue_number}
                                            </div>
                                        )}


                                        {(
                                            <div className="absolute mt-2 top-0 right-0 mr-10 flex font-extrabold font-open px-4  text-black space-x-2">
                                                <Link method="post"

                                                        className="flex items-center space-x-2"
                                                    href={route('queue.like', {
                                                    user_queue_id: userQueue.id
                                                })}> <span> {userQueue.likes_count} </span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor">
  <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
</svg></Link>

                                                <Link method="post"

                                                        className="flex items-center space-x-2"
                                                    href={route('queue.dislike', {
                                                    user_queue_id: userQueue.id
                                                })}><span> {userQueue.dislikes_count} </span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path> </svg> </Link>
                                            </div>
                                        )}

                                        {userQueue.status === 'completed' && (
                                            <div className="absolute bottom-0 right-0 mr-10 font-extrabold font-open px-4 bg-green-600 text-white text-red-500">
                                                DONE
                                            </div>
                                        )}

                                        <div className="grid md:grid-cols-3 grid-cols-1 items-center">
                                            <div className="pl-4 flex">
                                                <Badge className="mr-2 bg-black text-white">
                                                    #{userQueue.initial_queue_number}
                                                </Badge>
                                                {userQueue.is_boosted && (
                                                    <Badge className="mr-2 bg-violet-500 text-white">
                                                        <FlameIcon className="text-orange-300" /> BOOSTED
                                                    </Badge>
                                                )}
                                                <span className="text-black">{userQueue.name}</span>
                                            </div>

                                            {userQueue.message && (
                                                <div className="pl-4">
                                                    <h3 className="mr-2 inline-block text-black mb-0.5 text-base font-medium">
                                                        Message:
                                                    </h3>
                                                    <p className="inline-block text-muted-foreground text-sm">
                                                        {userQueue.message}
                                                    </p>
                                                </div>
                                            )}

                                            {userQueue.admin_notes && (
                                                <div className="pl-4">
                                                    <h3 className="inline-block mr-2 text-black mb-0.5 text-base font-medium">
                                                        Notes
                                                    </h3>
                                                    <p className="inline-block text-muted-foreground text-sm">
                                                        {userQueue.admin_notes}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ))}
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
