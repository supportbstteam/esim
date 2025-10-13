'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import AuthModal from './modals/AuthModal';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchUserDetails, logout } from '@/redux/slice/UserSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function Navbar() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [showlogin, setShowlogin] = useState(false); // auth modal
  const [isUserSubOpen, setIsUserSubOpen] = useState(false);
  const { user, isAuth } = useAppSelector((state) => state?.user || {});
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(fetchUserDetails());
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => setIsOpen((v) => !v);

  
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
    // ensure any timers cleared
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

  return (
    <nav className="bg-white ">
      <div className="container">
        <div className="flex items-center justify-between h-16 py-10">
         
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="sr-only">E-SIM AERO</span>
              <Image
                src="/Print.svg"
                alt="E-SIM AERO"
                width={300}
                height={100}
                className="h-11 w-[288px]  object-contain"
                priority
              />
            </Link>
          </div>

         
          <div className="hidden min-[950px]:flex  md:items-center md:space-x-8">
            <ul className="flex items-center space-x-8 text-[18px] text-[#1A0F33] font-medium">
              <li className="hover:text-green-500 transition cursor-pointer">View Plans</li>
              <li className="hover:text-green-500 transition cursor-pointer">How It Works</li>
              <li className="hover:text-green-500 transition cursor-pointer">Features</li>
              <li className="hover:text-green-500 transition cursor-pointer">Support</li>
              <li className="hover:text-green-500 transition cursor-pointer">Partner Program</li>
            </ul>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Desktop right */}
            <div className="hidden min-[950px]:flex items-center space-x-4">
              {!isAuth ? (
                <button
                  onClick={() => setShowlogin(true)}
                  className="bg-[#133365] text-white px-6 py-3.5  rounded-full hover:bg-[#3BC852] transition text-[16px]"
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
                        <Image src={'/Frame_63.png'} alt="User avatar" width={40} height={40} className="object-cover" />
                      </div>
                      <span className="text-[#1A0F33] font-medium text-sm">Admin</span>
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
                    <Link href="/account" onClick={() => setIsUserMenuOpen(false)} className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b" role="menuitem">
                      Account
                    </Link>
                    <Link href="/order" onClick={() => setIsUserMenuOpen(false)} className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b" role="menuitem">
                      My Plan
                    </Link>
                    <button onClick={handleLogout} className="w-full text-start px-4 py-2 hover:bg-gray-100" role="menuitem">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

           
            <div className="min-[950px]:hidden flex items-center">
              <button
                onClick={toggleMenu}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                className="p-2 rounded-md focus:ring-2 focus:ring-offset-2 "
              >
                {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
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
              <li className="text-lg font-medium"><button onClick={() => setIsOpen(false)} className="w-full text-left">View Plans</button></li>
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
                      <Image
                        src={'/Frame_63.png'}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                      />
                      <div className="text-left">
                        <div className="font-medium text-sm">Admin</div>
                        <div className="text-xs text-gray-500">{user?.email}</div>
                      </div>
                    </div>

                    {/* chevron */}
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
                        href="/account"
                        onClick={() => { setIsOpen(false); setIsUserSubOpen(false); }}
                        className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100"
                      >
                        Account
                      </Link>

                      <Link
                        href="/my-plan"
                        onClick={() => { setIsOpen(false); setIsUserSubOpen(false); }}
                        className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100"
                      >
                        My Plan
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

      <AuthModal isOpen={showlogin} onClose={() => setShowlogin(false)} onAuthSuccess={() => setShowlogin(false)} />
    </nav>
  );
}
