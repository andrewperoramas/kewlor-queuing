import React, { FormEventHandler } from 'react'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@headlessui/react';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';

type UserRequestForm = {
    message: string;
};

const AddRequestQueue = () => {

    const { data, setData, post, processing, errors, reset } = useForm<Required<UserRequestForm>>({
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('queue'), {
            onFinish: () => reset(),
        });
    };

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>Join</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Add your name on queue</DialogTitle>
            <DialogDescription>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="name">Request</Label>
                    </div>
                    <textarea
                        id="name"
                        className="mt-4 p-3 shadow-sm h-30  block w-full sm:text-sm w-full border-gray-300 rounded-md"
                        required
                        tabIndex={1}
                        autoComplete="current-name"
                        placeholder="Message"
                    />
                    <InputError message={errors.message} />
                </div>
                <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Join
                </Button>
                </form>

            </DialogDescription>
        </DialogContent>
    </Dialog>
      )
}

export default AddRequestQueue
