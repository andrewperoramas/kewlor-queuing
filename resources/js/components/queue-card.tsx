import { Link } from '@inertiajs/react';
import { FlameIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

const QueueCard = ({ userQueue }: { userQueue: App.Data.UserQueueData }) => {
    return (
        <Card
            className={`relative ${userQueue.is_boosted && 'bg-violet-500'} ${userQueue.status === 'completed' ? 'bg-green-200' : userQueue.status === 'skipped' && userQueue.queue_number === 0 ? 'bg-gray-200 text-white' : 'bg-white'} border-0 py-2`}
            key={userQueue.id}
        >
            {userQueue.status === 'skipped' && userQueue.queue_number === 0 && (
                <div className="font-open absolute right-0 bottom-0 mr-10 bg-gray-300 px-4 text-xs font-extrabold text-red-500 text-white">
                    SKIPPED
                </div>
            )}

            {userQueue.status === 'completed' && (
                <div className="font-open absolute right-0 bottom-0 mr-10 bg-green-600 px-4 text-xs font-extrabold text-red-500 text-white">DONE</div>
            )}

            <div className="mt-1 grid grid-cols-1 md:grid-cols-[300px_1fr_1fr_130px]">
                <div className="flex flex-wrap pl-4">
                    <Badge className="mr-2 h-9 rounded-xl bg-black px-3 text-lg font-bold text-white">#{userQueue.queue_number}</Badge>
                    {userQueue.is_boosted && (
                        <Badge className="mr-2 h-9 rounded-xl bg-violet-500 px-2 font-bold text-white">
                            <FlameIcon className="text-orange-300" /> BOOSTED
                        </Badge>
                    )}
                    <a href={`https://tiktok.com/@${userQueue.name}`} target="_blank" className="mt-1 h-8 text-black">
                        {userQueue.name}
                    </a>
                </div>

                {userQueue.message && (
                    <div className="pl-4">
                        <h3 className="mr-2 mb-0.5 inline-block text-base font-medium text-black">Your Prompt:</h3>
                        <p className="text-muted-foreground inline-block text-sm">{userQueue.message}</p>
                    </div>
                )}

                <div className="pl-4">
                    {userQueue.admin_notes && (
                        <>
                            <h3 className="mr-2 mb-0.5 inline-block text-base font-medium text-black">Notes</h3>
                            <p className="text-muted-foreground inline-block text-sm">{userQueue.admin_notes}</p>
                        </>
                    )}
                </div>

                <div>
                    <div className="font-open flex space-x-2 px-4 font-extrabold text-black">
                        <Link
                            method="post"
                            preserveState
                            preserveScroll
                            className="flex items-center space-x-2"
                            href={route('queue.like', {
                                user_queue_id: userQueue.id,
                            })}
                        >
                            {' '}
                            <span> {userQueue.likes_count} </span>{' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                width="24"
                                height="24"
                                stroke-width="2"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke="currentColor"
                            >
                                <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                            </svg>
                        </Link>

                        <Link
                            method="post"
                            preserveState
                            preserveScroll
                            className="flex items-center space-x-2"
                            href={route('queue.dislike', {
                                user_queue_id: userQueue.id,
                            })}
                        >
                            <span> {userQueue.dislikes_count} </span>{' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                width="24"
                                height="24"
                                stroke-width="2"
                            >
                                {' '}
                                <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>{' '}
                            </svg>{' '}
                        </Link>
                    </div>

                    {userQueue.queue_number !== 0 && (
                        <div className="px-4 text-[#028a85]">
                            <p className="text-sm font-thin">ORIGINAL# {userQueue.initial_queue_number}</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default QueueCard;
