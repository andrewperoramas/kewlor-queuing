import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Queues',
        url: '/admin/queues',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Kewlor',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },

];

export function AppSidebar() {

    const { flash }: any = usePage().props;

    useEffect(() => {
        if (flash?.message?.success) {

            toast.success(flash.message.success,
                {
                    duration: 2000
                });
        }
    }, [flash]);

    useEffect(() => {
        if (flash?.message?.error) {
            toast.error(flash.message.error, {
                duration: 2000
            });
        }
    }, [flash]);

    return (
        <Sidebar collapsible="offcanvas" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
