// components/Navbar.jsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import AuthModal from './modals/AuthModal';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchUserDetails, logout } from '@/redux/slice/UserSlice';
import Link from 'next/link'

export default function Navbar() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [showlogin, setShowlogin] = useState(false); // auth modal
  const { user, isAuth } = useAppSelector((state) => state?.user || {});
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

const userMenuRef = useRef<HTMLDivElement | null>(null);

const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogout = async () => {
   await dispatch(logout());
   await dispatch(fetchUserDetails());
  };

  const toggleMenu = () => setIsOpen((v) => !v);

  // Close user menu on click outside / Esc
useEffect(() => {
  function onDocClick(e: MouseEvent) {
    if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
      setIsUserMenuOpen(false);
    }
  }
  document.addEventListener("mousedown", onDocClick);
  return () => document.removeEventListener("mousedown", onDocClick);
}, []);
  
  const handleUserEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsUserMenuOpen(true);
  };
  const handleUserLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsUserMenuOpen(false);
      closeTimerRef.current = null;
    }, 150);
  };

  return (
    <nav className="bg-white">
      <div className="container relative flex items-center justify-between px-6 md:px-[10%] py-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image height={100} width={100} src="/FullLogo1.png" alt="E-SIM AERO" className="h-10 w-auto md:h-12" />
          <Image height={100} width={100} src="/FullLogo2.png" alt="E-SIM AERO" className="h-10 w-auto md:h-12" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden text-[18px] md:flex space-x-[32px] text-[#1A0F33] font-medium">
          <li className="hover:text-green-500 cursor-pointer transition">View Plans</li>
          <li className="hover:text-green-500 cursor-pointer transition">How It Works</li>
          <li className="hover:text-green-500 cursor-pointer transition">Features</li>
          <li className="hover:text-green-500 cursor-pointer transition">Support</li>
          <li className="hover:text-green-500 cursor-pointer transition">Partner Program</li>
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuth ? (
            <button
              onClick={() => setShowlogin(true)}
              className="bg-[#133365] text-white px-6 py-2 rounded-full hover:bg-blue-900 transition"
            >
              Login/Signup
            </button>
          ) : (
            <div
              className="relative inline-block"
              ref={userMenuRef}
              onMouseEnter={handleUserEnter}
              onMouseLeave={handleUserLeave}
            >
              <button
                onClick={() => setIsUserMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
                className="p-2 rounded-md hover:bg-gray-100 flex items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                    <Image
                      src='/Frame_63.png'
                      alt='User avatar'
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[#1A0F33] font-medium">Admin</span>
                </div>
                <HiChevronDown
                  className={`ml-2 w-5 h-5 transform transition-transform ${
                    isUserMenuOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {/* Dropdown */}
              <div
                className={`absolute left-0 top-full mt-1 z-50 min-w-[200px] rounded-[8px] bg-white 
                  border border-[#e1e1e1] shadow-lg overflow-hidden
                  transition-all duration-150 ease-out transform origin-top-left
                  ${
                    isUserMenuOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                      : 'opacity-0 -translate-y-1 pointer-events-none scale-[0.995]'
                  }`}
                role="menu"
              >
                <Link
                  href="/account"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b"
                  role="menuitem"
                >
                  Account
                </Link>
                <Link
                  href="/order"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b"
                  role="menuitem"
                >
                  My Plan
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-start px-4 py-2 hover:bg-gray-100"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-20 left-0 w-full bg-white shadow-md md:hidden z-50 transform transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
          <ul className="flex flex-col items-center space-y-4 py-6 text-[#1A0F33] font-medium">
            <li className="hover:text-green-500 cursor-pointer transition">View Plans</li>
            <li className="hover:text-green-500 cursor-pointer transition">How It Works</li>
            <li className="hover:text-green-500 cursor-pointer transition">Features</li>
            <li className="hover:text-green-500 cursor-pointer transition">Support</li>
            <li className="hover:text-green-500 cursor-pointer transition">Partner Program</li>

            {!isAuth ? (
              <li>
                <button
                  onClick={() => {
                    setShowlogin(true);
                    setIsOpen(false);
                  }}
                  className="bg-[#133365] text-white px-6 py-2 rounded-full hover:bg-blue-900 transition"
                >
                  Login/Signup
                </button>
              </li>
            ) : (
              <>
                <li className="flex items-center gap-3 mt-2">
                  <Image
                    src='/Frame_63.png'
                    alt="avatar"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                  />
                  <span className="text-[#1A0F33] font-medium">Admin</span>
                </li>
                <li className="w-full">
                  <Link
                    href="/account"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b rounded"
                  >
                    Account
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/my-plan"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b rounded"
                  >
                    My Plan
                  </Link>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <AuthModal
        isOpen={showlogin}
        onClose={() => setShowlogin(false)}
        onAuthSuccess={() => setShowlogin(false)}
      />
    </nav>
  );
}
