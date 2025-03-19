import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    guestName?: string;
}

type LiveSettings = {
  date: string;
  schedule: string;
};

export default ({ children, guestName }: AppLayoutProps) => {


  const page = usePage<{ settings: LiveSettings }>();
  const settings = page.props.settings ?? { date: "2024-01-01", schedule: "9am - 5pm" };

    return (
    <div className="bg-white h-screen text-black">
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

                <div className="flex flex-col">

                        <span className="text-xl">
                    {guestName && (<>

                        Hi {guestName}

                    </>)}
</span>

                        <h1 className="font-bold dont-open text-2xl">
                            {settings.date}
                        </h1>

                        <h1  className="font-bold font-open text-2xl">
                            {settings.schedule}
                        </h1>

                </div>

            </div>
            {children}
        </div>
    </div>
)};
