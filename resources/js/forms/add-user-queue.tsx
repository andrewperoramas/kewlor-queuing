import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useUserStore from '@/stores/useUserQueueStore';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type UserForm = {
    name: string;
    email: string;
};

const AddUserQueue = () => {
    const { user, setUser } = useUserStore();
    const { data, setData, processing, errors } = useForm<Required<UserForm>>({
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
        <form className="flex w-1/4 flex-col gap-6" onSubmit={submit}>
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
                <Button type="submit" className="mt-4 w-full bg-black text-white hover:bg-gray-700" tabIndex={4} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Confirm
                </Button>
            </div>
        </form>
    );
};

export default AddUserQueue;
