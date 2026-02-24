import React from 'react';
import Image from 'next/image'

interface QuoteCardProps {
  content: string;
  name: string;
  profession?: string;
  imageSrc?: string;
  className?: string; // 👈 allow custom height
}

const QuoteCard = ({
  content,
  name,
  profession,
  imageSrc,
  className = "",
}: QuoteCardProps) => {
  return (
    <div
      className={`w-full flex items-center rounded-lg bg-[#F3F5F7] ${className}`}
    >
      <div className="flex flex-col p-5 w-full">
        <Image
          height={100}
          width={100}
          src="/Vector_hang.png"
          alt="Quote Icon"
          className="w-10 h-10 mb-4"
        />

        <p className="subtext !leading-7 !text-[#1A0F33] mb-4">
          {content}
        </p>

        <p className="mt-auto subtext !leading-10 flex items-center border-t-2 pt-4 border-white">
          {name} – {profession}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
