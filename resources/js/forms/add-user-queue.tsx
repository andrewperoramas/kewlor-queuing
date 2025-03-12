import React from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useUserStore from '@/stores/useUserQueueStore';

type UserForm = {
    name: string;
    email: string;
};

const AddUserQueue = () => {
    const { user, setUser } = useUserStore();
    const { data, setData, post, processing, errors, reset } = useForm<Required<UserForm>>({
        name: '',
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setUser(data);
    };

    if (user) {
        return null;
    }

    return (
        <form className="flex flex-col gap-6 w-1/4" onSubmit={submit}>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="name">Name</Label>
                    </div>
                    <Input
                        id="name"
                        type="text"
                        required
                        tabIndex={1}
                        autoComplete="current-name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Name"
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        autoFocus
                        tabIndex={2}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="email@example.com"
                    />
                    <InputError message={errors.email} />
                </div>
                <Button type="submit" variant="default" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Confirm
                </Button>
            </div>
        </form>
    );
};

export default AddUserQueue;
