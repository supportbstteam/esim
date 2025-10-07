import Link from "next/link";
import React from "react";
import { LuFacebook } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { TbBrandWhatsapp } from "react-icons/tb";

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
    { icon: LuFacebook, href: "#" },
    { icon: RiTwitterXFill, href: "#" },
    { icon: MdOutlineEmail, href: "mailto:info@example.com" },
    { icon: CiLinkedin, href: "#" },
    { icon: TbBrandWhatsapp, href: "#" },
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
        <footer className="bg-[#052766] text-white md:px-[10%] py-12">
            <div className="max-w-[1380px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-10">
                {/* Logo & About */}
                <div className="md:col-span-2">
                    <img src="/footerLogo.png" alt="footerLogo" className="w-[115px]" />
                    <p className="mt-4 text-gray-300">
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
                                        className="text-gray-300 hover:text-white transition-colors"
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
                            <Link key={idx} href={href} className="h-10 w-10">
                                <Icon className="h-10 w-10" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t mt-20 border-white pt-6 text-center text-sm text-white">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </footer>
    );
};
