'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { HiX, HiChevronDown } from 'react-icons/hi';
import { RxHamburgerMenu } from "react-icons/rx";
import AuthModal from './modals/AuthModal';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { logout } from '@/redux/slice/UserSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { useNavigate } from './hooks/navigation';
import { AiOutlineUser } from "react-icons/ai";
const navItems = [
  { label: "Countries", href: "/country" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Features", href: "/features" },
  { label: "Support", href: "/contact-us" },
  // { label: "Partner Program", href: "/partner-program" },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation: any = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [showlogin, setShowlogin] = useState(false); // auth modal
  const [isUserSubOpen, setIsUserSubOpen] = useState(false);
  const { user, isAuth, loading } = useAppSelector((state) => state?.user || {});
  const { cart } = useAppSelector((state) => state?.cart || {});
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);


  const [selectedPlans, setSelectedPlans] = useState<{ [key: string]: number }>({});
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();

  const handleLogout = async () => {
    await dispatch(logout());
    navigation('/');
    toast.success("Log out");
    // await dispatch(fetchUserDetails());
  };

  const toggleMenu = () => setIsOpen((v) => !v);
  const plansArray = Object.entries(selectedPlans).map(([planId, quantity]) => ({ planId, quantity }));
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsUserMenuOpen(false);
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);



  useEffect(() => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (isOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);

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


  // console.log("----- isAuth ----", cart?.items.length);

  return (
    <nav className="bg-white ">
      <div className="container">
        <div className="flex items-center justify-between h-16 py-10">

          {/* Logo and main nav links */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center justify-start gap-2">
              <Image
                src="/Print.svg"
                alt="E-SIM AERO"
                width={300}
                height={44}
                className="h-auto md:h-auto w-[288px] max-md:w-[180px] object-contain"
                priority
              />
            </Link>
          </div>

          <div className="hidden min-[1100px]:flex md:items-center md:space-x-8">
            <ul className="flex items-center space-x-8 text-[18px] text-[#1A0F33] font-medium">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-green-500 transition cursor-pointer">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">

            {/* Desktop right */}
            <div className="hidden min-[1100px]:flex items-center space-x-4">

              {(loading && !isAuth) ? (
                <div className="space-y-3 animate-pulse">
                  {/* Skeleton avatar and text */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-300" />
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="h-4 w-24 rounded bg-gray-300" />
                      <div className="h-3 w-32 rounded bg-gray-200" />
                    </div>
                  </div>
                  {/* Skeleton button */}
                  {/* <div className="h-10 rounded bg-gray-300 w-full" /> */}
                </div>
              ) : !isAuth ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setAuthModalTab('login');
                      setShowlogin(true);
                    }}

                    className="border-[#133365] text-[#133365] border-1 px-6 py-2 rounded-full hover:bg-[#3BC852] hover:text-white hover:border-[#3BC852] transition text-[16px]"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setAuthModalTab('signup');
                      setShowlogin(true);
                    }}
                    className="bg-[#133365] text-white px-6 py-2 rounded-full hover:bg-[#3BC852] transition text-[16px]"
                  >
                    Signup
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className='relative'> <span className='absolute bg-black rounded-full text-white h-3.5 w-3.5 right-[-5px] flex items-center justify-center p-1 text-[10px]'>{cart?.items?.length || 0}</span>
                    <Link href={`/country/checkout`}> <span className="material-symbols-outlined">
                      shopping_bag
                    </span></Link>  </div>

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
                        <div className="h-10 w-10 flex justify-center items-center rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                          <AiOutlineUser size={20} />
                        </div>
                        <span className="text-[#1A0F33] font-medium text-sm">{user?.firstName && user?.lastName && (user?.firstName + " " + user?.lastName)}</span>
                      </div>
                      <HiChevronDown
                        className={`ml-2 w-5 h-5 transform transition-transform ${isUserMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                      />
                    </button>

                    <div
                      className={`absolute right-0 top-full mt-2 z-50 min-w-[200px] rounded-[8px] bg-white border border-[#e1e1e1] shadow-lg overflow-hidden
                      transition-all duration-150 ease-out transform origin-top-right
                      ${isUserMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' : 'opacity-0 -translate-y-1 pointer-events-none scale-[0.995]'}`}
                      role="menu"
                    >
                      <Link href="/profile" onClick={() => setIsUserMenuOpen(false)} className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b" role="menuitem">
                        My Account
                      </Link>

                      <Link href="/e-sim" onClick={() => setIsUserMenuOpen(false)} className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b" role="menuitem">
                        My Plan
                      </Link>

                      {/* <Link href="/order" onClick={() => setIsUserMenuOpen(false)} className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b" role="menuitem">
                        My Order
                      </Link> */}
                      <button onClick={handleLogout} className="w-full text-start px-4 py-2 hover:bg-gray-100" role="menuitem">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="min-[1100px]:hidden flex items-center">
              <button
                onClick={toggleMenu}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                className="p-2 rounded-md focus:ring-2 focus:ring-offset-2 "
              >
                {isOpen ? <HiX size={26} /> : <RxHamburgerMenu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-50 min-[1100px]:hidden transition-transform duration-300 ease-in-out ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        <div className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
              <Image src="/FullLogo1.png" alt="logo" width={120} height={36} className="h-8 w-auto object-contain" />
            </Link>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu" className="p-2 rounded-md">
              <HiX size={22} />
            </button>
          </div>
          <nav className="px-4 py-6">
            <ul className="flex flex-col gap-4">
              <li className="text-lg font-medium"><button onClick={() => setIsOpen(false)} className="w-full text-left">Countries</button></li>
              <li className="text-lg font-medium"><button onClick={() => setIsOpen(false)} className="w-full text-left">How It Works</button></li>
              <li className="text-lg font-medium"><button onClick={() => setIsOpen(false)} className="w-full text-left">Features</button></li>
              <li className="text-lg font-medium"><button onClick={() => setIsOpen(false)} className="w-full text-left">Support</button></li>
              <li className="text-lg font-medium"><button onClick={() => setIsOpen(false)} className="w-full text-left">Partner Program</button></li>
            </ul>
            <div className="mt-6">
              {!isAuth ? (
                <button
                  onClick={() => {
                    setShowlogin(true);
                    setIsOpen(false);
                  }}
                  className="w-full bg-[#133365] text-white px-4 py-2 rounded-full hover:bg-blue-900 transition"
                >
                  Login / Signup
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => setIsUserSubOpen((v) => !v)}
                    className="w-full flex items-center justify-between gap-3 px-2 py-3 hover:bg-gray-50 rounded"
                    aria-expanded={isUserSubOpen}
                    aria-controls="mobile-user-submenu"
                  >
                    <div className="flex items-center gap-3">
                      <AiOutlineUser size={20} />
                      <div className="text-left">
                        <div className="font-medium text-sm">Admin</div>
                        <div className="text-xs text-gray-500">{user?.email}</div>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${isUserSubOpen ? 'rotate-180' : 'rotate-0'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div
                    id="mobile-user-submenu"
                    className={`overflow-hidden transition-[max-height] duration-200 ease-in-out ${isUserSubOpen ? 'max-h-48' : 'max-h-0'}`}
                  >
                    <div className="flex flex-col gap-2 px-2 mt-2">
                      <Link
                        href="/profile"
                        onClick={() => { setIsOpen(false); setIsUserSubOpen(false); }}
                        className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100"
                      >
                        My Account
                      </Link>

                      {/* <Link
                        href="/order"
                        onClick={() => { setIsOpen(false); setIsUserSubOpen(false); }}
                        className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100"
                      >
                        My Order
                      </Link> */}

                      <Link
                        href="/e-sim"
                        onClick={() => { setIsOpen(false); setIsUserSubOpen(false); }}
                        className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100"
                      >
                        My Plans
                      </Link>
                      <button
                        onClick={() => { handleLogout(); setIsOpen(false); setIsUserSubOpen(false); }}
                        className="w-full text-left py-2 px-3 rounded hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      <AuthModal
        isOpen={showlogin} initialTab={authModalTab} onClose={() => setShowlogin(false)} onAuthSuccess={() => setShowlogin(false)} />
    </nav>
  );
}
