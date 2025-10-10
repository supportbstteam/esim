import Link from "next/link";
import React from "react";
import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa6";
import { BiLogoWhatsapp } from "react-icons/bi";

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

// Convert text to URL-friendly slug
const toSlug = (text: string) =>
    text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

// Determine the correct URL for each item
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

export const Footer = () => {
    return (
        <footer className="bg-[#052766] text-white  py-12">
            <div className="container flex justify-between items-start gap-15">
                {/* Logo & About */}
                <div className="w-[330px]">
                    <img src="/footerLogo.png" alt="footerLogo" className="w-[115px]" />
                    <p className="mt-10 text-gray-300 text-[16px]">
                        We provide affordable and instant eSIM solutions for global travelers. Skip roaming fees and enjoy seamless connectivity in 200+ countries.
                    </p>
                </div>

                {/* Link Sections */}
                {linkSections.map(({ title, items }, idx) => (
                    <div key={idx}>
                        <h4 className="text-lg mb-4">{title}</h4>
                        <ul className="space-y-2">
                            {items.map((item, i) => (
                                <li key={i}>
                                    <Link
                                        href={getHref(title, item)}
                                        className="text-gray-300 hover:text-white transition-colors text-[14px]"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Socials */}
                <div>
                    <h4 className="text-lg mb-4">Connect With Us</h4>
                    <div className="flex gap-5 text-2xl">
                        {socials.map(({ icon: Icon, href }, idx) => (
                            <Link key={idx} href={href} className="group h-7 w-7 p-[6px] border bg-[#d5d7dc73] flex items-center rounded-full hover:bg-green-50 cursor-pointer">
                                <Icon className="h-10 w-10 transition-colors group-hover:text-blue-950" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t mt-20 container border-white pt-6 text-center text-sm text-white">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </footer>
    );
};
