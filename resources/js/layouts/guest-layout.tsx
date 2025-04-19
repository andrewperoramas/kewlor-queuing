import { Link, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    guestName?: string;
}

type LiveSettings = {
    date: string;
    schedule: string;
};

export default ({ children }: AppLayoutProps) => {
    const page = usePage<{ settings: LiveSettings }>();
    const settings = page.props.settings ?? { date: '2024-01-01', schedule: '9am - 5pm' };

    return (
        <div className="text-black">
            <div className="mx-auto w-full max-w-[1360px]">
                <div className="flex flex-col items-center justify-center pt-8 md:flex-row lg:justify-between">
                    <div className="flex space-x-2">
                        <img src="/kewlor.jpeg" className="w-24 rounded-full" alt="logo" />
                        <div>
                            <h2 className="font-open text-2xl font-[700]">WELCOME TO</h2>
                            <h1 className="font-open bg-black text-center text-3xl font-extrabold text-white">KEWLOR'S</h1>
                            <h2 className="font-open text-2xl font-[700]">TIKTOK LIVE</h2>
                        </div>
                    </div>

                    <div className="my-4 flex flex-col items-center md:my-0">
                        <h1 className="font-open text-2xl font-bold">{settings.date}</h1>

                        <h1 className="font-open text-2xl font-bold">{settings.schedule}</h1>
                    </div>
                </div>
                {children}

                <footer className="mt-10">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-center">Copyright &copy; {new Date().getFullYear()} Kewlor's Tiktok Live. All rights reserved.</p>
                        </div>

                        <div className="flex space-x-4">
                            <Link href="" className="text-center">
                                Terms and Conditions
                            </Link>
                            <span>|</span>
                            <Link href="" className="text-center">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
