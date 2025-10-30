import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type LoadingModalProps = {
    open: boolean;
    message?: string;
    size?: "sm" | "md" | "lg";
    // optional: whether to show a subtle progress bar
    showProgress?: boolean;
};

// Simple spinner (SVG)
const Spinner: React.FC<{ size?: number }> = ({ size = 48 }) => (
    <svg
        role="status"
        aria-label="Loading"
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.15" />
        <path
            d="M22 12a10 10 0 00-10-10"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
        />
    </svg>
);

export default function LoadingModal({ open, message, size = "md", showProgress = false }: LoadingModalProps) {
    const containerSize = size === "sm" ? "w-52 py-6" : size === "lg" ? "w-96 py-8" : "w-72 py-7";

    return (
        <AnimatePresence>
            {open && (
                // backdrop
                <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    aria-hidden={!open}
                >
                    {/* blurred background layer */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

                    {/* modal container */}
                    <motion.div
                        key="modal"
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Loading"
                        className={`relative z-10 ${containerSize} bg-white/95  rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center px-4`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-green-400 ">
                                <Spinner size={size === "sm" ? 36 : size === "lg" ? 64 : 48} />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-semibold text-neutral-900 ">{message || "Processing..."}</div>
                                <div className="text-xs text-neutral-500  mt-1">Please wait a moment</div>
                            </div>
                        </div>

                        {showProgress ? (
                            <div className="w-full mt-4">
                                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                                    />
                                </div>
                            </div>
                        ) : null}

                        {/* subtle cancel hint (not a button) */}
                        <div className="text-[11px] text-neutral-400 mt-3">You can safely leave this page — the process will continue.</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
