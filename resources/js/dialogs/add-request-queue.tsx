import React, { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type UserRequestForm = {
    message: string;
    email: string;
    name: string;
};

const AddRequestQueue = () => {
    const [open, setOpen] = React.useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm<Required<UserRequestForm>>({
        message: '',
        email: '',
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('queue.store'), {
            onSuccess: () => {
                setOpen(false);
                // window.location.reload();
            },
        });
        reset();
        clearErrors();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button className="font-open hover:bg-gray bg-black font-bold text-white" onClick={() => setOpen(true)}>
                ADD YOUR NAME TO THE QUEUE
            </Button>
            <DialogContent className="dark:bg-white dark:text-black">
                <DialogTitle>Add your name on queue</DialogTitle>
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="name">Request</Label>
                        </div>
                        <div className="mt-4 grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="name">Tiktok Username</Label>
                            </div>
                            <Input
                                id="name"
                                type="text"
                                required
                                tabIndex={1}
                                autoComplete="current-name"
                                className="border-0 shadow-sm"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Name"
                            />
                            <InputError message={errors.name} />
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

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address (Optional)</Label>
                        <Input
                            id="email"
                            type="email"
                            autoFocus
                            tabIndex={2}
                            className="border-0 shadow-sm"
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <Button type="submit" className="hover:bg-gray mt-4 w-full bg-black text-white" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Join
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddRequestQueue;
