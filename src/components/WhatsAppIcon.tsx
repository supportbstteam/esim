"use client";

import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { iconMap } from "./SocialIcons";
import { FaWhatsapp } from "react-icons/fa";
import { api } from "@/lib/api";
import { X } from "lucide-react";

interface ContactItem {
  id: string;
  position: string;
  type: string;
  value: string;
}

const WhatsAppIcon = () => {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [show, setShow] = useState(true);
  const { links } = useAppSelector((state) => state?.links);

  const defaultIcon = FaWhatsapp;

  const dynamicSocials =
    links?.map((social: { type: string; link: string }) => {
      const normalizedType = social?.type?.trim()?.toLowerCase();

      const matchedKey = Object.keys(iconMap).find(
        (key) => key.toLowerCase() === normalizedType
      );

      const Icon = matchedKey ? iconMap[matchedKey] : defaultIcon;

      return {
        icon: Icon,
        href: social?.link || "#",
        type: social?.type || "Unknown",
      };
    }) || [];

  const fetchContact = async () => {
    try {
      const response: ContactItem[] = await api({
        url: "user/cms/contacts",
        method: "GET",
      });

      if (response.length > 0) setContacts(response);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const whatsapp = dynamicSocials.find(
    (item) => item?.type?.toLowerCase() === "whatsapp"
  );

  if (!whatsapp || !show) return null;

  const Icon = whatsapp.icon;

  const chats = contacts.filter((c) => c.type === "Chat");
  if (!chats.length) return null;

  const handleClick = () => {
  const phone = chats[0].value.replace(/\s+/g, "");
  const text = encodeURIComponent("Hi");

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // try open app
    const appUrl = `whatsapp://send?phone=${phone}&text=${text}`;
    const webUrl = `https://web.whatsapp.com/send?l=en&phone=${phone}&text=${text}`;

    const start = Date.now();

    window.location.href = appUrl;

    // fallback if app not installed
    setTimeout(() => {
      if (Date.now() - start < 1500) {
        window.open(webUrl, "_blank");
      }
    }, 1200);

  } else {
    // desktop
    window.open(
      `https://web.whatsapp.com/send?l=en&phone=${phone}&text=${text}`,
      "_blank"
    );
  }
};

  return (
    <div className="fixed bottom-5 right-5 flex items-start  z-50">
      
      

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
      >
        <Icon size={28} />
      </button>

      {/* Close button */}
      <button
        onClick={() => setShow(false)}
        className="bg-black shadow-md rounded-full p-1 hover:bg-gray-700"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default WhatsAppIcon;