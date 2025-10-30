"use client";

import React, { Suspense } from "react";
import ThankYouContent from "./ThankYouContent";
export default function ThankYouPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen text-lg font-medium text-neutral-600">Loading...</div>}>
            <ThankYouContent />
        </Suspense>
    );
}
