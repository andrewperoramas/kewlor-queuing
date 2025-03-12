import React, { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import useUserStore from '@/stores/useUserQueueStore';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type UserRequestForm = {
    message: string;
    email: string;
    name: string;
};

const AddRequestQueue = () => {
    const { user } = useUserStore();

    const [open, setOpen] = React.useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm<Required<UserRequestForm>>({
        message: '',
        email: user?.email ?? '',
        name: user?.name ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('queue.store'), {
            onSuccess: () => {
                setOpen(false);
            },
            preserveScroll: true,
        });

        reset();
        clearErrors();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button className="bg-black text-white hover:bg-gray"  onClick={() => setOpen(true)}>Join</Button>
            <DialogContent
 className="dark:bg-white dark:text-black"
            >
                <DialogTitle>Add your name on queue</DialogTitle>
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="name">Request</Label>
                        </div>
                        <textarea
                            id="name"
                            className="mt-4 block h-30 w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-sm"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            required
                            tabIndex={1}
                            autoComplete="current-name"
                            placeholder="Message"
                        />
                        {errors.message && <InputError message={errors?.message} />}

                        {errors.email && <InputError message={errors?.email} />}

                        {errors.name && <InputError message={errors?.name} />}
                    </div>
                    <Button  type="submit" className=" hover:bg-gray bg-black text-white mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Join
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddRequestQueue;
