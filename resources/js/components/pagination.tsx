import { Link } from "@inertiajs/react";
import React from "react";
import { Button } from "./ui/button";

interface PaginationProps {
    target?: string,
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

const Pagination: React.FC<PaginationProps> = ({ links, target = "scroll-target" }) => {

    const mergeQueryParams = (url: any) => {
        if (typeof window === "undefined") return url;

        const currentParams = new URLSearchParams(window.location.search);
        const urlObj = new URL(url, window.location.origin);

        currentParams.forEach((value, key) => {
            if (!urlObj.searchParams.has(key)) {
                urlObj.searchParams.append(key, value);
            }
        });

        return urlObj.toString();
    };

    return (
        <nav className="table-responsive pb-3 pb-lg-0">
            <ul className="flex gap-3 mb-0 align-items-center justify-content-center ">
                {links && links.length > 3 &&
                    links.map((link, index) => {
                        if (!link.url) return null;
                        return (
                            <li
                                key={index}
                                className={`page-item me-lg-6 `}
                            >
                                <Link
                                    href={mergeQueryParams(link.url)}
                                    preserveScroll={true}
                                    target={target}
                                >
                                    <Button className={`
                                ${link.active ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"}
`}>{link.label}</Button>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </nav>
    );
};

export default Pagination;
