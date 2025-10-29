// components/modals/ThankyouModal.tsx
"use client";
import React, { useEffect } from "react";

type ThankyouModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    ctaText?: string;
    onCta?: () => void;
    autoCloseMs?: number | null; // e.g. 3000 to auto-close after 3s
};

const ThankyouModal: React.FC<ThankyouModalProps> = ({
    isOpen,
    onClose,
    title = "Thank you!",
    message = "Your action was successful.",
    ctaText = "Continue",
    onCta,
    autoCloseMs = null,
}) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);

        let timer: number | undefined;
        if (autoCloseMs && autoCloseMs > 0) {
            timer = window.setTimeout(() => onClose(), autoCloseMs);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            if (timer) clearTimeout(timer);
        };
    }, [isOpen, onClose, autoCloseMs]);

    if (!isOpen) return null;

    return (
        <div
            aria-modal="true"
            role="dialog"
            aria-labelledby="thankyou-modal-title"
            aria-describedby="thankyou-modal-desc"
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            {/* Backdrop with blur + dim */}
            <div
                className="absolute inset-0"
                onClick={onClose}
                // Tailwind: backdrop-blur-md applies blur to everything behind the element.
                // We add a semi-transparent background so it also dims.
                style={{
                    // Provide fallback for browsers without backdrop-filter
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                }}
            >
                <div className="w-full h-full bg-black/45" />
            </div>

            {/* Modal Container (not blurred) */}
            <div
                className="relative max-w-md w-full mx-4 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 z-10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="flex flex-col items-center text-center gap-4">
                    {/* A simple success icon */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <h3 id="thankyou-modal-title" className="text-xl font-semibold text-gray-900">
                        {title}
                    </h3>
                    <p id="thankyou-modal-desc" className="text-sm text-gray-600">
                        {message}
                    </p>

                    <div className="mt-2 w-full flex justify-center gap-3">
                        {/* <button
                            onClick={() => {
                                onCta ? onCta() : onClose();
                            }}
                            className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                        >
                            {ctaText}
                        </button> */}

                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankyouModal;
