import Link from "next/link";
import React from "react";
import { LuFacebook } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { TbBrandWhatsapp } from "react-icons/tb";

export const Footer = () => {
    return (
        <footer className=" bg-[#052766] text-white  md:px-[10%] py-12 pt-25">
            <div className="max-w-[1380px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-10">
                {/* Logo & About */}
                <div className="md:col-span-2 pr-15">
                    <img src={`/footerLogo.png`} alt="footerLogo" className="w-[115px]" />
                    <p className="mt-4 subtext  !text-gray-300">
                       We provide affordable and instant eSIM solutions for global travelers. Skip roaming fees and enjoy seamless connectivity in 200+ countries.
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
                        <LuFacebook className="h-10 w-10" />
                        <RiTwitterXFill className="h-10 w-10"  />
                        <MdOutlineEmail className="h-10 w-10"   />
                        <CiLinkedin  className="h-10 w-10"  />
                        <TbBrandWhatsapp  className="h-10 w-10"  />
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t mt-20 border-white  pt-6 text-center text-sm text-white">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </footer>
    );
};
