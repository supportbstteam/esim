import React from 'react';

interface QuoteCardProps {
  quote: string;
  name: string;
  designation: string;
  imageSrc?: string;
}

const QuoteCard = ({ quote, name, designation, imageSrc }: QuoteCardProps) => {
  return (
    <div className="flex items-center rounded-lg bg-[#F3F5F7] max-w-[403px] mx-auto">
      {/* Image */}
     

      {/* Content */}
      <div className="flex flex-col p-5">
        <img src="/Vector_hang.png" alt="Quote Icon" className="w-10 h-10 mb-4 px-1 py-2" />
        <p className="subtext !leading-7 !text-[#1A0F33]  mb-4">{quote}</p>
        <p className="mt-0 subtext !leading-10 flex items-center border-t-2 pt-4 border-white">
         {imageSrc && (
        <img src={imageSrc} alt={name} className="w-[30px] h-30px rounded-full mr-3" />
      )} {name}– {designation}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
