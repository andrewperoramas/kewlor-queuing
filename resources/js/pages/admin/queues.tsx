import AppLayout from '@/layouts/app-layout';
import { PaginatedCollection } from '@/types/global';
import { Link, usePoll } from '@inertiajs/react';
import React from 'react';

const Queues = ({ userQueues }: { userQueues: PaginatedCollection<App.Data.AdminQueueData> }) => {
  const firstInQueue = userQueues.data.length > 0 ? userQueues.data[0] : null;

  const remainingQueues = userQueues.data.length > 1 ? userQueues.data.slice(1) : [];

  usePoll(2000, {
        only: ['userQueues'],
   })

  return (
    <AppLayout>
      {firstInQueue && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">First in Queue</h2>
          <div className="flex justify-between items-end">
          <div className="space-y-2">
            <p><strong>Name:</strong> {firstInQueue.name}</p>
            <p><strong>Request:</strong> {firstInQueue.message}</p>
            <p><strong>Queue Number:</strong> {firstInQueue.queue_number}</p>
          </div>

            <Link method="delete" className="w-20 py-2 bg-red-500 rounded-md text-white text-center" href={route('admin.queue.destroy', firstInQueue.queue_number)} >Done</Link>
                    </div>


        </div>
      )}

      {remainingQueues.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-bold p-6">Remaining Queue</h2>
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Queue Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {remainingQueues.map((userQueue: App.Data.AdminQueueData) => (
                <tr key={userQueue.queue_number}>
                  <td className="px-6 py-4 whitespace-nowrap">{userQueue.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{userQueue.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{userQueue.queue_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No remaining data in the queue.</p>
      )}
    </AppLayout>
  );
};

export default Queues;
