"use client";

import Link from "next/link";
import React, { useState } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa6";
import { BiLogoWhatsapp } from "react-icons/bi";
import Image from "next/image";
const linkSections = [
  {
    title: "Quick Links",
    items: ["Home", "Plan & Pricing", "Why Choose Us", "How It Works", "FAQs", "Contact Us"],
  },
  {
    title: "Support",
    items: ["Help Center", "Device Compatibility", "Setup Guide", "Troubleshooting", "Refund Policy"],
  },
  {
    title: "Legal",
    items: ["Terms & Conditions", "Privacy Policy", "Cookie Policy"],
  },
];

const socials = [
  { icon: RiFacebookFill, href: "#" },
  { icon: RiTwitterXFill, href: "#" },
  { icon: MdOutlineEmail, href: "mailto:info@example.com" },
  { icon: FaLinkedinIn, href: "#" },
  { icon: BiLogoWhatsapp, href: "#" },
];

const toSlug = (text: string) =>
  text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const getHref = (section: string, item: string) => {
  if (section === "Quick Links") {
    if (item === "Home") return "/";
    if (item === "Contact Us") return "/contact-us";
    if (item === "FAQs") return "/faq";
    return `/quick-links/${toSlug(item)}`;
  }
  if (section === "Support") return `/supports/${toSlug(item)}`;
  if (section === "Legal") return `/${toSlug(item)}`;
  return "#";
};

export const Footer: React.FC = () => {
  // track open sections on mobile (by index)
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleSection = (i: number) => {
    setOpenIdx((prev) => (prev === i ? null : i));
  };

  return (
    <footer className="bg-[#133366] text-white py-10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 gap-6 items-start">
          {/* Logo & About */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block">
              <Image height={100} width={100} src="/footer_main.png" alt="footerLogo" className="w-[115px] h-auto" />
            </Link>
            <p className="text-gray-300 text-sm sm:text-[15px] md:text-[16px]">
              We provide affordable and instant eSIM solutions for global travelers. Skip roaming fees and enjoy seamless
              connectivity in 200+ countries.
            </p>

            <div className="mt-2 md:hidden">
              <h4 className="text-sm text-gray-200 mb-3">Connect With Us</h4>
              <div className="flex gap-2 items-center">
                {socials.map(({ icon: Icon, href }, idx) => (
                  <Link
                    key={idx}
                    href={href}
                    className="group h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                    aria-label={`Visit our social ${idx}`}
                  >
                    <Icon className="w-5 h-5 transition-colors group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Link Sections (collapsible on small screens) */}
          {linkSections.map(({ title, items }, idx) => (
            <div key={idx}>
              {/* Mobile: collapsible header */}
              <button
                type="button"
                onClick={() => toggleSection(idx)}
                className="w-full flex items-center justify-between md:justify-start md:gap-0 md:mb-4 md:cursor-default"
                aria-expanded={openIdx === idx}
              >
                <h4 className="text-lg md:text-base mb-2 md:mb-0 md:mr-0">{title}</h4>
                {/* chevron only visible on mobile */}
                <span className="md:hidden ml-2 text-gray-300">
                  <svg
                    className={`w-4 h-4 transform transition-transform ${openIdx === idx ? "rotate-180" : "rotate-0"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              <ul
                className={`transition-[max-height] duration-200 ease-in-out overflow-hidden md:overflow-visible ${
                  openIdx === idx ? "max-h-80" : "max-h-0 md:max-h-full"
                } md:max-h-full`}
              >
                {items.map((item, i) => (
                  <li key={i} className="mb-2">
                    <Link href={getHref(title, item)} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
           <div className=" max-md:hidden ">
              <h4 className="text-lg md:text-base mb-2 md:mb-4 md:mr-0">Connect With Us</h4>
              <div className="flex gap-2 items-center">
                {socials.map(({ icon: Icon, href }, idx) => (
                  <Link
                    key={idx}
                    href={href}
                    className="group h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                    aria-label={`Visit our social ${idx}`}
                  >
                    <Icon className="w-5 h-5 transition-colors group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
        </div>

        {/* Divider & copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-white/80">
          © {new Date().getFullYear()} Esim. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
