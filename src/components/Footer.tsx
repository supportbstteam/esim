"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RiFacebookFill, RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { BiLogoWhatsapp } from "react-icons/bi";
import { IconType } from "react-icons";
import { getAllLinks } from "@/redux/slice/SocialLinkSlice";
import { Images } from "./Images";
import { fetchCountries } from "@/redux/thunk/thunk";
import { featurePlans } from "@/redux/thunk/planThunk";
import { iconMap } from "./SocialIcons";

const linkSections = [
  {
    title: "Quick Links",
    items: ["Home", "About Us", "Plan & Pricing", "How It Works", "FAQs", "Contact Us"],
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

const toSlug = (text: string) =>
  text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const getHref = (section: string, item: string) => {
  if (section === "Quick Links") {
    if (item === "Home") return "/";
    if (item === "Contact Us") return "/contact-us";
    if (item === "About Us") return "/about-us";
    if (item === "FAQs") return "/faq";
    if (item === "Plan & Pricing") return "/country";
    if (item === "How It Works") return "/how-it-works";
    return `/quick-links/${toSlug(item)}`;
  }
  if (section === "Support") {

    if (item === "Setup Guide") return "/set-up";
    if (item === "Device Compatibility") return "/supports/devices";
    return `/supports/${toSlug(item)}`;

  }
  if (section === "Legal") return `/${toSlug(item)}`;
  return "#";
};

export const Footer: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { links } = useAppSelector((state) => state?.links);
  const { countries } = useAppSelector((state) => state.country);
  const dispatch = useAppDispatch();
  const DefaultIcon = MdOutlineEmail;

  const toggleSection = (i: number) => {
    setOpenIdx((prev) => (prev === i ? null : i));
  };

  // console.log("🌐 Dynamic social links:", links);

  // ✅ Map backend links to icon components

  const dynamicSocials =
    links?.map((social: { type: string; link: string }) => {

      // normalize type safely
      const normalizedType =
        social?.type?.trim()?.toLowerCase();

      // find matching key in iconMap (case insensitive)
      const matchedKey = Object.keys(iconMap).find(
        key => key.toLowerCase() === normalizedType
      );

      const Icon = matchedKey
        ? iconMap[matchedKey]
        : DefaultIcon;

      return {
        icon: Icon,
        href: social?.link || "#",
        type: social?.type || "Unknown",
      };

    }) || [];


  useEffect(() => {
    const fetchTesti = async () => {
      await dispatch(getAllLinks());
      await dispatch(fetchCountries());
      await dispatch(featurePlans());
    }
    fetchTesti();
  }, [dispatch]);

  return (
    <footer className="bg-[#001637] text-white py-10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 gap-6 items-start">
          {/* Logo & About */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block">
              <Image height={100} width={100} src="/footer_main.png" alt="footerLogo" className="w-[115px] h-auto" />
            </Link>
            <p className="!text-white text-sm sm:text-[15px] md:text-[16px]">
              We provide affordable and instant eSIM solutions for global travelers. Skip roaming fees and enjoy seamless
              connectivity in {(() => {
                const count = countries?.length || 0;

                if (count < 10) return `${count} countries`;

                // Get the first digit and convert rest to zeros
                const digits = count.toString();
                const firstDigit = digits[0];
                const zeros = "0".repeat(digits.length - 1);
                const display = `${firstDigit}${zeros}+`;

                return `${display} countries`;
              })()}.
            </p>

            {/* Mobile view */}
            <div className="mt-2 md:hidden">
              <h4 className="text-sm text-gray-200 mb-3">Connect With Us</h4>
              <div className="flex gap-2 items-center">
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  dynamicSocials.map(({ icon: Icon, href, type }: any, idx) => (
                    <Link
                      key={idx}
                      href={href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                      aria-label={type}
                    >
                      <Icon className="w-5 h-5 text-white group-hover:text-[#3BC852]" />
                    </Link>
                  ))}

                {/* <p className="text-white" >Download for Android</p> */}
              </div>
              <div className="mt-4">
                {/* <p className="text-white">Download for Android</p> */}
                <Link
                  href={process.env.NEXT_PUBLIC_APK_URL || "#"}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  <Image className="w-30 h-30" src={Images.AndroidDownload} alt="Download for Android" />
                </Link>
              </div>
            </div>
          </div>

          {/* Link Sections */}
          {linkSections.map(({ title, items }, idx) => (
            <div key={idx}>
              <button
                type="button"
                onClick={() => toggleSection(idx)}
                className="w-full flex items-center justify-between md:justify-start md:gap-0 md:mb-4 md:cursor-default"
                aria-expanded={openIdx === idx}
              >
                <h4 className="text-lg md:text-base mb-2 md:mb-0 md:mr-0">{title}</h4>
                <span className="md:hidden ml-2 text-gray-300">
                  <svg
                    className={`w-4 h-4 transform transition-transform ${openIdx === idx ? "rotate-180" : "rotate-0"
                      }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>

              <ul
                className={`transition-[max-height] duration-200 ease-in-out overflow-hidden md:overflow-visible ${openIdx === idx ? "max-h-80" : "max-h-0 md:max-h-full"
                  } md:max-h-full`}
              >
                {items.map((item, i) => (
                  <li key={i} className="mb-2">
                    <Link
                      href={getHref(title, item)}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Desktop view social icons */}
          <div className="max-md:hidden">
            <h4 className="text-lg md:text-base mb-2 md:mb-4 md:mr-0">Connect With Us</h4>
            <div className="flex gap-2 items-center">
              { // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dynamicSocials.map(({ href, type }: any, idx: number) => {
                  const Icon = iconMap[type] || MdOutlineEmail;

                  return (
                    <Link
                      key={idx}
                      href={href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group h-9 w-9 flex items-center justify-center rounded-full bg-[#233756] hover:bg-[#3BC852] transition"
                      aria-label={type}
                    >
                      <Icon className="w-5 h-5 text-white transition-transform duration-200 group-hover:scale-110" />
                    </Link>
                  );
                })
              }

            </div>

            <div className="mt-4">
              {/* <p className="text-white">Download for Android</p> */}
              <Link
                href={process.env.NEXT_PUBLIC_APK_URL || "#"}
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                <Image src={Images.AndroidDownload} alt="Download for Android" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-white/80">
          © {new Date().getFullYear()} Esim. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
