import Link from "next/link";
import React from "react";
import { LuFacebook } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { TbBrandWhatsapp } from "react-icons/tb";

export const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white px-6 md:px-[10%] py-12 mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-20">
                {/* Logo & About */}
                <div>
                    <img src={`/footerLogo.png`} alt="footerLogo" className="w-36" />
                    <p className="mt-4 text-sm leading-relaxed text-gray-300">
                        It is a long established fact that a reader will be distracted by
                        the readable content of a page when looking at its layout. The point
                        of using Lorem Ipsum is that it has a more-or-less normal
                        distribution of letters.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        {["Home", "Plan & Pricing", "Why Choose Us", "How It Works", "FAQs", "Contact Us"].map(
                            (item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="text-lg mb-4">Support</h4>
                    <ul className="space-y-2">
                        {[
                            "Help Center",
                            "Device Compatibility",
                            "Setup Guide",
                            "Troubleshooting",
                            "Refund Policy",
                        ].map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="text-lg mb-4">Legal</h4>
                    <ul className="space-y-2">
                        {["Terms & Conditions", "Privacy Policy", "Cookie Policy"].map(
                            (item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg  mb-4">Connect With Us</h4>
                    <div className="flex gap-5  text-2xl">
                        <LuFacebook />
                        <RiTwitterXFill />
                        <MdOutlineEmail />
                        <CiLinkedin />
                        <TbBrandWhatsapp />
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </footer>
    );
};
