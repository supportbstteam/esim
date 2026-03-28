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

    window.open(
      `https://web.whatsapp.com/send?l=en&phone=${phone}&text=${text}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-5 left-5 flex items-start  z-50">
      {/* Close button */}
      <button
        onClick={() => setShow(false)}
        className="bg-black shadow-md rounded-full p-1 hover:bg-gray-700"
      >
        <X size={14} />
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
      >
        <Icon size={28} />
      </button>
    </div>
  );
};

export default WhatsAppIcon;