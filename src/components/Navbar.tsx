"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiX, HiChevronDown } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import AuthModal from "./modals/AuthModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout } from "@/redux/slice/UserSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useNavigate } from "./hooks/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
const navItems = [
  { label: "eSIM", href: "/country" },
  { label: "How It Works", href: "/cms/how-it-works" },
  { label: "Features", href: "/cms/features" },
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
  const { user, isAuth, loading } = useAppSelector(
    (state) => state?.user || {},
  );

  console.log("user", user)
  const { cart } = useAppSelector((state) => state?.cart || {});
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isUserMenuMobileOpen, setIsUserMenuMobileOpen] = useState(false);

  const [selectedPlans, setSelectedPlans] = useState<{ [key: string]: number }>(
    {},
  );
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();

  const handleLogout = async () => {
    await dispatch(logout());
    navigation("/");
    toast.success("Log out");
    // await dispatch(fetchUserDetails());
  };

  const toggleMenu = () => setIsOpen((v) => !v);
  const plansArray = Object.entries(selectedPlans).map(
    ([planId, quantity]) => ({ planId, quantity }),
  );
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsUserMenuOpen(false);
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
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
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const menuItems: any = [
  //   { label: "eSim", href: "/country" },
  //   { label: "How It Works", href: "/how-it-works" },
  //   { label: "Features", href: "/features" },
  //   { label: "Support", href: "/contact-us" },
  // ];

  // console.log("----- isAuth ----", cart?.items.length);

  return (
    <nav className="bg-white ">
      <div className="container">
        <div className="flex items-center justify-between h-16 py-10">
          {/* Left Side: Mobile (Hamburger + Logo) | Desktop (Logo) */}
          <div className="flex items-center gap-1 flex-1 min-[1100px]:flex-none justify-start">
            {/* Mobile: Hamburger (Left) | Desktop: Hidden */}
            <div className="min-[1100px]:hidden">
              <button
                onClick={toggleMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="p-2 rounded-md focus:ring-2 focus:ring-offset-2"
              >
                <RxHamburgerMenu size={26} />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/Print.svg"
                  alt="E-SIM AERO"
                  width={300}
                  height={44}
                  className="h-auto md:h-auto w-[288px] max-md:w-[140px] object-contain"
                  priority
                />
              </Link>
            </div>
          </div>

          <div className="hidden min-[1100px]:flex md:items-center md:space-x-8">
            <ul className="flex items-center space-x-8 text-[18px] text-[#1A0F33] font-medium">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-green-500 transition cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right controls */}
          <div className="flex items-center justify-end gap-4 flex-1 min-[1100px]:flex-none">
            {/* Mobile Controls: Cart + Profile */}
            <div className="min-[1100px]:hidden flex items-center gap-3">
              <Link href="/country/checkout">
                <div className="relative cursor-pointer">
                  <span className="absolute bg-black rounded-full text-white h-3.5 w-3.5 right-[-5px] flex items-center justify-center p-1 text-[10px]">
                    {cart?.items?.length || 0}
                  </span>
                  <IoCartOutline size={22} />
                </div>
              </Link>

              <button
                onClick={() => {
                  if (isAuth) {
                    setIsUserMenuMobileOpen(true);
                  } else {
                    setAuthModalTab("login");
                    setShowlogin(true);
                  }
                }}
                className="h-8 w-8 flex justify-center items-center rounded-full overflow-hidden border border-gray-200"
              >
                {isAuth && user?.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${user?.image}`}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <AiOutlineUser size={18} />
                )}
              </button>
            </div>

            {/* Desktop right */}
            <div className="hidden min-[1100px]:flex items-center space-x-4">
              {loading && !isAuth ? (
                <div className="space-y-3 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-300" />
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="h-4 w-24 rounded bg-gray-300" />
                      <div className="h-3 w-32 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ) : !isAuth ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setAuthModalTab("login");
                      setShowlogin(true);
                    }}
                    className="border-[#133365] text-[#133365] border-1 px-6 py-2 rounded-full hover:bg-[#3BC852] hover:text-white hover:border-[#3BC852] transition text-[16px]"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setAuthModalTab("signup");
                      setShowlogin(true);
                    }}
                    className="bg-[#133365] text-white px-6 py-2 rounded-full hover:bg-[#3BC852] transition text-[16px]"
                  >
                    Signup
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/country/checkout">
                    <div className="relative cursor-pointer">
                      <span className="absolute bg-black rounded-full text-white h-3.5 w-3.5 right-[-5px] flex items-center justify-center p-1 text-[10px]">
                        {cart?.items?.length || 0}
                      </span>

                      <span className="material-symbols-outlined">
                        <IoCartOutline size={22} />
                      </span>
                    </div>
                  </Link>

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
                          {user?.image !== "" && user?.image !== null ? (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${user?.image}`}
                              alt="Profile"
                              width={56}
                              height={56}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <AiOutlineUser size={20} />
                          )}
                        </div>
                        <span className="text-[#1A0F33] font-medium text-sm">
                          {user?.firstName &&
                            user?.lastName &&
                            user?.firstName + " " + user?.lastName}
                        </span>
                      </div>
                      <HiChevronDown
                        className={`ml-2 w-5 h-5 transform transition-transform ${isUserMenuOpen ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>

                    <div
                      className={`absolute right-0 top-full mt-2 z-50 min-w-[200px] rounded-[8px] bg-white border border-[#e1e1e1] shadow-lg overflow-hidden
                      transition-all duration-150 ease-out transform origin-top-right
                      ${isUserMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto scale-100" : "opacity-0 -translate-y-1 pointer-events-none scale-[0.995]"}`}
                      role="menu"
                    >
                      <Link
                        href="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b"
                        role="menuitem"
                      >
                        My Account
                      </Link>

                      <Link
                        href="/e-sim"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full text-start py-2 hover:bg-gray-100 px-4 border-b"
                        role="menuitem"
                      >
                        My Plan
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-start px-4 py-2 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Mobile menu (Left Drawer) */}
      <div
        className={`fixed inset-0 z-50 min-[1100px]:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 w-[280px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src="/Print.svg"
                alt="logo"
                width={150}
                height={36}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button onClick={() => setIsOpen(false)} className="p-2">
              <HiX size={22} />
            </button>
          </div>
          {/* <nav className="p-4">
            <ul className="flex flex-col gap-4">
              {menuItems.map((item: any, index: number) => (
                <li key={index} className="text-lg font-medium border-b border-gray-50 pb-2">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block w-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav> */}
        </div>
      </div>

      {/* User menu (Right Drawer) */}
      <div
        className={`fixed inset-0 z-50 min-[1100px]:hidden transition-opacity duration-300 ${isUserMenuMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsUserMenuMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-[280px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isUserMenuMobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-[#133365]">Account</h2>
            <button onClick={() => setIsUserMenuMobileOpen(false)} className="p-2">
              <HiX size={22} />
            </button>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                {user?.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${user?.image}`}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <AiOutlineUser size={24} />
                  </div>
                )}
              </div>
              <div>
                <div className="font-bold text-[#1A0F33]">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-xs text-gray-500 truncate w-40">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-2">
            <Link
              href="/profile"
              onClick={() => setIsUserMenuMobileOpen(false)}
              className="block w-full py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
            >
              My Account
            </Link>
            <Link
              href="/e-sim"
              onClick={() => setIsUserMenuMobileOpen(false)}
              className="block w-full py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
            >
              My Plan
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsUserMenuMobileOpen(false);
              }}
              className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 text-red-600 font-medium mt-4 border-t"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showlogin}
        initialTab={authModalTab}
        onClose={() => setShowlogin(false)}
        onAuthSuccess={() => setShowlogin(false)}
      />
    </nav>
  );
}
