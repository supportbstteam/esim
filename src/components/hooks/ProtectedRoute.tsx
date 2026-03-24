"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/modals/AuthModal";
import { useAppSelector } from "@/redux/store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth } = useAppSelector((state) => state.user || {});
  const [showlogin, setShowlogin] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      setShowlogin(true);
    }
  }, [isAuth]);

  if (!isAuth) {
    return (
      <>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#1A0F33]">
              Please login first
            </h2>

            <p className="text-gray-500 mt-2">
              You need to login to access this page
            </p>

            <button
              onClick={() => setShowlogin(true)}
              className="mt-4 bg-[#133365] text-white px-6 py-2 rounded-full hover:bg-[#3BC852] transition"
            >
              Login
            </button>
          </div>
        </div>

        <AuthModal
          isOpen={showlogin}
          initialTab="login"
          onClose={() => setShowlogin(false)}
          onAuthSuccess={() => setShowlogin(false)}
        />
      </>
    );
  }

  return <>{children}</>;
}