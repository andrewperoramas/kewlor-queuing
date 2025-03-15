import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    guestName?: string;
}

export default ({ children, guestName, ...props }: AppLayoutProps) => (
    <div className="bg-white text-black">
        <div className="max-w-[1360px] w-full mx-auto">
            <div className="flex pt-8 justify-between">
                <div className="flex space-x-2">
                    <img src="/kewlor.jpeg" className="w-24 rounded-full" alt="logo" />
                    <div>
                        <h2 className="text-2xl font-[700] font-open">WELCOME TO</h2>
                        <h1 className="text-3xl font-open bg-black text-center text-white font-extrabold">KEWLOR'S</h1>
                        <h2 className="text-2xl font-[700] font-open">TIKTOK LIVE</h2>
                    </div>
                </div>

                <div>

                    {guestName && (<>

                        Hi {guestName}

                    </>)}

                </div>

            </div>
            {children}
        </div>
    </div>
);
