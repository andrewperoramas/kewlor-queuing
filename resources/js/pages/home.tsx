import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


type UserForm = {
    name: string;
    email: string;
};

export default function Home() {

    const { data, setData, post, processing, errors, reset } = useForm<Required<UserForm>>({
        name: '',
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('queue'), {
            onFinish: () => reset(),
        });
    };

    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>


            <div className="flex min-h-screen flex-col gap-2 items-center justify-center  bg-[#FDFDFC] p-6 text-[#1b1b18]  lg:p-8 ">
                <h1>Join Us Berting</h1>

            <form className="flex flex-col gap-6 w-1/4" onSubmit={submit}>
                <div className="grid gap-6">

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Name</Label>
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
            </div>
        </>
    );
}
