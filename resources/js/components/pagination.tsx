import { Link } from '@inertiajs/react';
import React from 'react';
import { Button } from './ui/button';

interface PaginationProps {
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    onPageChange?: (url: string) => void; // Callback for page changes (nullable)
}

const Pagination: React.FC<PaginationProps> = ({ links, onPageChange }) => {
    const mergeQueryParams = (url: string) => {
        if (typeof window === 'undefined') return url;

        const currentParams = new URLSearchParams(window.location.search);
        const urlObj = new URL(url, window.location.origin);

        // Merge existing query parameters into the new URL
        currentParams.forEach((value, key) => {
            if (!urlObj.searchParams.has(key)) {
                urlObj.searchParams.append(key, value);
            }
        });

        return urlObj.toString();
    };

    const handleClick = (url: string) => {
        if (onPageChange) {
            onPageChange(url); // Notify parent component of page change if callback is provided
        }
    };

    return (
        <nav className="table-responsive pb-lg-0 pb-3">
            <ul className="align-items-center justify-content-center mb-0 flex gap-3">
                {links &&
                    links.length > 3 &&
                    links.map((link, index) => {
                        if (!link.url) return null;

                        return (
                            <li key={index} className={`page-item me-lg-6`}>
                                <Link
                                    href={mergeQueryParams(link.url)}
                                    preserveScroll={true}
                                    onClick={(e) => {
                                        if (onPageChange) {
                                            e.preventDefault(); // Prevent default navigation if onPageChange is provided
                                            handleClick(link.url!); // Trigger page change
                                        }
                                        // If onPageChange is not provided, the default Link behavior will occur
                                    }}
                                >
                                    <Button
                                        className={` ${link.active ? 'bg-black text-white hover:bg-black' : 'bg-white text-black hover:bg-gray-50'} `}
                                    >
                                        {link.label}
                                    </Button>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </nav>
    );
};

export default Pagination;
