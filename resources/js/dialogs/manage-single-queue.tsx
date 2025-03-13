import React, { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

type ManageSingleQueueForm = {
    notes: string;
    queue_number: number;
    status: string;
    id: number;
};

const ManageSingleQueue = ({
    userQueue,
    setIsUpdated
}: {
        userQueue: App.Data.UserQueueData
        setIsUpdated: any;
    }) => {

    const handleDoneCheckboxClick = () => {
        if (data.status == 'completed') {
            setData('status', 'queued')
        } else {
            setData('status', 'completed')
        }
    };

    const [open, setOpen] = React.useState(false);

    const { data, setData, post, processing, errors, clearErrors } = useForm<Required<ManageSingleQueueForm>>({
        notes: userQueue?.admin_notes ?? '',
        id: userQueue?.id,
        status:  userQueue?.status ?? 'queued',
        queue_number: userQueue?.queue_number
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.queue.update', userQueue.id), {
            onSuccess: () => {
                setOpen(false);
                setIsUpdated(true)
            },
            preserveScroll: true,
            // preserveState: true
        });

        clearErrors();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button className="bg-black text-white hover:bg-gray"  onClick={() => setOpen(true)}>Manage</Button>
            <DialogContent
 className="dark:bg-white dark:text-black"
            >
                <DialogTitle>Add your name on queue</DialogTitle>
                <form className="flex flex-col gap-6" onSubmit={submit}>

            <div className="grid gap-2">

                        <div className="flex items-center">
                            <Label htmlFor="name">Current Queue</Label>
                        </div>

                        <Input
                            id="queue_number"
                            className="mt-4 block  w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm"
                            value={data.queue_number}
                            onChange={(e) => setData('queue_number', parseInt(e.target.value))}
                            required
                            type="number"
                            tabIndex={1}
                            autoComplete="current-name"
                            placeholder="Queue Number"
                        />
                        {errors.queue_number && <InputError message={errors?.queue_number} />}

                    </div>


                    <div className="grid gap-2">

                        <div className="flex items-center">
                            <Label htmlFor="name">Notes</Label>
                        </div>

                        <textarea
                            id="name"
                            className="mt-4 block h-30 w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            tabIndex={1}
                            autoComplete="current-name"
                            placeholder="Message"
                        />
                        {errors.notes && <InputError message={errors?.notes} />}

                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="status"
                            name="status"
                            checked={data.status === 'completed'}
                            disabled={processing}
                            onClick={(e) => handleDoneCheckboxClick(e)}
                            tabIndex={3}
                        />
                        <Label htmlFor="status">Marked as complete</Label>
                    </div>

                    <Button  type="submit" className=" hover:bg-gray bg-black text-white mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Update
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ManageSingleQueue;
