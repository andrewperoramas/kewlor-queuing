import { Head, useForm, usePage } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

type LiveSettings = {
    date: string;
    schedule: string;
};

export default function Appearance() {
    const page = usePage<{ settings: LiveSettings }>();
    const settings = page.props.settings ?? { date: '2024-01-01', schedule: '9am - 5pm' };

    const { data, setData, post } = useForm<LiveSettings>({
        date: settings.date,
        schedule: settings.schedule,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('live.settings.update'), {
            onSuccess: () => {
                toast.success('Settings saved successfully');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <form onSubmit={submit}>
                    <div className="space-y-6">
                        <HeadingSmall title="Live Settings" description="The live settings for your account" />

                        <div className="flex flex-col space-y-4">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" name="date" value={data.date} onChange={(e) => setData('date', e.target.value)} />
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Label htmlFor="schedule">Schedule</Label>
                            <Input id="schedule" name="schedule" value={data.schedule} onChange={(e) => setData('schedule', e.target.value)} />
                        </div>

                        <div>
                            <Button>Save</Button>
                        </div>
                    </div>
                </form>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
