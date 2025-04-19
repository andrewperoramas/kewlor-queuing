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
  const settings = page.props.settings ?? { date: "2024-01-01", schedule: "9am - 5pm" };

    return (
    <div className="  text-black">
        <div className="max-w-[1360px] w-full mx-auto">
            <div className="flex pt-8 lg:justify-between justify-center items-center flex-col md:flex-row">
                <div className="flex space-x-2">
                    <img src="/kewlor.jpeg" className="w-24 rounded-full" alt="logo" />
                    <div>
                        <h2 className="text-2xl font-[700] font-open">WELCOME TO</h2>
                        <h1 className="text-3xl font-open bg-black text-center text-white font-extrabold">KEWLOR'S</h1>
                        <h2 className="text-2xl font-[700] font-open">TIKTOK LIVE</h2>
                    </div>
                </div>

                <div className="flex flex-col items-center md:my-0 my-4">
                        <h1 className="font-bold font-open text-2xl">
                            {settings.date}
                        </h1>

                        <h1  className="font-bold font-open text-2xl">
                            {settings.schedule}
                        </h1>

                </div>

            </div>
            {children}


            <footer className="mt-10">
                <div className="flex justify-between">
                    <div>
                        <p className="text-center">Copyright &copy; {new Date().getFullYear()} Kewlor's Tiktok Live. All rights reserved.</p>
                    </div>

                    <div className="flex space-x-4">
                        <Link href="" className="text-center">Terms and Conditions</Link>
                         <span>|</span>
                        <Link href="" className="text-center">Privacy Policy</Link>
                    </div>
                </div>
            </footer>

        </div>

    </div>
)};
