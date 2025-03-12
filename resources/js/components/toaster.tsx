'use client';
import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

function useMaxToasts(max: number) {
    const { toasts } = useToasterStore(); // Access toasts directly from useToasterStore

    useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= max) // Is toast index over the limit?
            .forEach((t) => toast.dismiss(t.id)); // Dismiss each extra toast
    }, [toasts, max]); // Use the `toasts` and `max` dependencies directly
}

export function CToaster({ max = 10, ...props }) {
    useMaxToasts(max); // Pass only max; no need to pass toasts manually

    return (
        <Toaster
            toastOptions={{
                className: 'text-md font-normal',
            }}
            {...props}
        />
    );
}
