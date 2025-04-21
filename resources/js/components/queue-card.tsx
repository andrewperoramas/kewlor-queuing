import { Link } from '@inertiajs/react';
import { FlameIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

const QueueCard = ({ userQueue }: { userQueue: App.Data.UserQueueData }) => {
    return (
        <Card
            className={`relative ${userQueue.boost_count > 0 && 'bg-violet-500'} ${userQueue.status === 'completed' ? 'bg-green-200' : userQueue.status === 'skipped' && userQueue.queue_number === 0 ? 'bg-gray-200 text-white' : 'bg-white'} border-0 py-2 ${userQueue.is_working && 'bg-red-400'}`}
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

            <div className="mt-1 grid grid-cols-1 md:grid-cols-[300px_1fr_1fr_1fr]">
                <div className="flex flex-wrap pl-4">
                    <Badge className="mr-2 h-9 rounded-xl bg-black px-3 text-lg font-bold text-white">#{userQueue.row_number}</Badge>
                    <a href={`https://tiktok.com/@${userQueue.name}`} target="_blank" className="mt-1 h-8 text-black">
                        {userQueue.name}
                    </a>
                </div>

                {userQueue.message && (
                    <div className="pl-4">
                        <h3 className="mr-2 mb-0.5 inline-block text-base font-medium text-black">Your Prompt:</h3>
                        <p className={`text-muted-foreground inline-block text-sm ${userQueue.is_working && 'text-white'}`}>{userQueue.message}</p>
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

                <div className="justify-center items-end flex flex-col">
                    <div className="font-open flex space-x-2 px-4 font-extrabold text-black ">
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
                        <div className="px-4 text-[#028a85] flex space-x-1">
                            {
                            userQueue.boost_count > 0 &&
                            <>
                            <p className="text-sm font-thin flex items-center text-yellow-700">
<svg  xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24"  fill="currentColor"  className="h-4 w-4 icon icon-tabler icons-tabler-filled icon-tabler-bolt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 2l.018 .001l.016 .001l.083 .005l.011 .002h.011l.038 .009l.052 .008l.016 .006l.011 .001l.029 .011l.052 .014l.019 .009l.015 .004l.028 .014l.04 .017l.021 .012l.022 .01l.023 .015l.031 .017l.034 .024l.018 .011l.013 .012l.024 .017l.038 .034l.022 .017l.008 .01l.014 .012l.036 .041l.026 .027l.006 .009c.12 .147 .196 .322 .218 .513l.001 .012l.002 .041l.004 .064v6h5a1 1 0 0 1 .868 1.497l-.06 .091l-8 11c-.568 .783 -1.808 .38 -1.808 -.588v-6h-5a1 1 0 0 1 -.868 -1.497l.06 -.091l8 -11l.01 -.013l.018 -.024l.033 -.038l.018 -.022l.009 -.008l.013 -.014l.04 -.036l.028 -.026l.008 -.006a1 1 0 0 1 .402 -.199l.011 -.001l.027 -.005l.074 -.013l.011 -.001l.041 -.002z" /></svg>
                                        {userQueue.boost_count}</p>

                        <div className="text-black">|</div>
</>
                            }

                            <p className="text-sm font-thin flex items-center">ORIGINAL# {userQueue.initial_queue_number}</p>
                        </div>
                </div>
            </div>
        </Card>
    );
};

export default QueueCard;
