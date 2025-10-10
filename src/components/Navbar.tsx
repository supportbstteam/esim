// components/Navbar.jsx
'use client';
import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import AuthModal from './modals/AuthModal';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchUserDetails } from '@/redux/slice/UserSlice';
export default function Navbar() {

  // const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showlogin, setShowlogin] = useState(false);

  // useEffect(()=>{
  //   const fetchUser = async()=>{
  //     await dispatch(fetchUserDetails());
  //   }

  //   fetchUser();
  // },[dispatch]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const { user } = useAppSelector(state => state?.user);

  // console.log("---- user in nav bar-----", user);

  return (
    <nav className="  bg-white shadow-md ">
      {/* Logo */}
      <div className="container relative flex items-center justify-between px-6 md:px-[10%] py-2">
        <div className="flex items-center">
          <img src="/FullLogo1.png" alt="E-SIM AERO" className="h-10 w-auto md:h-12" />
          <img src="/FullLogo2.png" alt="E-SIM AERO" className="h-10 w-auto md:h-12" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden text-[18px] md:flex space-x-[32px] text-[#1A0F33] font-medium">
          <li className="hover:text-green-500 cursor-pointer transition">View Plans</li>
          <li className="hover:text-green-500 cursor-pointer transition">How It Works</li>
          <li className="hover:text-green-500 cursor-pointer transition">Features</li>
          <li className="hover:text-green-500 cursor-pointer transition">Support</li>
          <li className="hover:text-green-500 cursor-pointer transition">Partner Program</li>
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <button onClick={() => { setShowlogin(true) }} className="bg-[#133365] text-[#FFFFFF] px-6 py-4 rounded-full hover:bg-blue-900 transition cursor-pointer">
            Get eSIM Card
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu with Animation */}
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
            <li>
              <button onClick={() => { setShowlogin(true) }} className="bg-[#133365] text-[#FFFFFF] px-[25x] py-2 rounded-full hover:bg-blue-900 transition">
                Get eSIM Card
              </button>
            </li>
          </ul>
        </div>
      </div>
      <AuthModal isOpen={showlogin} onClose={() => setShowlogin(false)} onAuthSuccess={() => {
        console.log("-- good --")
      }} />
    </nav>
  );
}
