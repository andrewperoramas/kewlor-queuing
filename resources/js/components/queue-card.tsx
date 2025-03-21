import React from 'react'
import { Card } from './ui/card'
import { Link } from '@inertiajs/react'
import { Badge } from './ui/badge'
import { FlameIcon } from 'lucide-react'

const QueueCard = ({userQueue} : {
    userQueue: App.Data.UserQueueData
}) => {
  return (
                                    <Card
                                        className={`
                                            relative
                                            ${userQueue.is_boosted && 'bg-violet-500'}
                                            ${userQueue.status === 'completed' ? 'bg-green-200' : userQueue.status === 'skipped' && userQueue.queue_number === 0 ? 'bg-gray-200 text-white' : 'bg-white'}
                                            border-0
                    py-2
                                        `}
                                        key={userQueue.id}
                                    >
                                        {userQueue.status ==='skipped' && userQueue.queue_number === 0 && (
                                            <div className="absolute bottom-0 right-0 mr-10 font-extrabold font-open text-xs px-4 bg-gray-300 text-white text-red-500">
                                                SKIPPED
                                            </div>
                                        )}




                                        {userQueue.status === 'completed' && (
                                            <div className="absolute bottom-0 right-0 mr-10 font-extrabold font-open px-4 bg-green-600 text-xs text-white text-red-500">
                                                DONE
                                            </div>
                                        )}

                                        <div className="grid md:grid-cols-[300px_1fr_1fr_130px] mt-1 grid-cols-1 ">
                                            <div className="pl-4 flex flex-wrap">
                                                <Badge className="mr-2 bg-black h-9 font-bold rounded-xl text-lg px-3  text-white">
                                                    #{userQueue.queue_number}
                                                </Badge>
                                                {userQueue.is_boosted && (
                                                    <Badge className="mr-2 font-bold rounded-xl bg-violet-500 h-9 px-2 text-white">
                                                        <FlameIcon className="text-orange-300" /> BOOSTED
                                                    </Badge>
                                                )}
                                                <a href={`https://tiktok.com/@${userQueue.name}`} target="_blank" className="text-black h-8 mt-1">{userQueue.name}</a>
                                            </div>

                                            {userQueue.message && (
                                                <div className="pl-4">
                                                    <h3 className="mr-2 inline-block text-black mb-0.5 text-base font-medium">
                                                        Your Prompt:
                                                    </h3>
                                                    <p className="inline-block text-muted-foreground text-sm">
                                                        {userQueue.message}
                                                    </p>
                                                </div>
                                            )}

                                                <div className="pl-4">

                                            {userQueue.admin_notes && (
                        <>
                                                    <h3 className="inline-block mr-2 text-black mb-0.5 text-base font-medium">
                                                        Notes
                                                    </h3>
                                                    <p className="inline-block text-muted-foreground text-sm">
                                                        {userQueue.admin_notes}
                                                    </p>
</>

                                            )}
                                                </div>

                <div>
                                            <div className=" flex font-extrabold font-open px-4  text-black space-x-2">
                                                <Link method="post"
                                                        preserveState
                                                        preserveScroll
                                                        className="flex items-center space-x-2"
                                                    href={route('queue.like', {
                                                    user_queue_id: userQueue.id
                                                })}> <span> {userQueue.likes_count} </span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor">
  <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
</svg></Link>

                                                <Link method="post"
                                                        preserveState
                                                        preserveScroll

                                                        className="flex items-center space-x-2"
                                                    href={route('queue.dislike', {
                                                    user_queue_id: userQueue.id
                                                })}><span> {userQueue.dislikes_count} </span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path> </svg> </Link>
                                            </div>



                                        {userQueue.queue_number !== 0 && (
                                            <div className="px-4 text-[#028a85] ">
                    <p className="text-sm font-thin">
                                                ORIGINAL# {userQueue.initial_queue_number}</p>
                                            </div>
                                        )}
                </div>
                                        </div>
                                    </Card>
  )
}

export default QueueCard
