import React from 'react';

interface QuoteCardProps {
  quote: string;
  name: string;
  designation: string;
  imageSrc?: string;
}

const QuoteCard = ({ quote, name, designation, imageSrc }: QuoteCardProps) => {
  return (
    <div className="flex items-center rounded-lg bg-[#F3F5F7] max-w-lg mx-auto my-4">
      {/* Image */}
     

      {/* Content */}
      <div className="flex flex-col p-5">
        <img src="/Vector_hang.png" alt="Quote Icon" className="w-6 h-6 mb-4" />
        <p className="subtext !leading-7 !text-[#1A0F33]  mb-4">"{quote}"</p>
        <p className="mt-0 subtext !leading-10 flex items-center border-t-4 pt-4 border-white">
         {imageSrc && (
        <img src={imageSrc} alt={name} className="w-[30px] h-30px rounded-full mr-3" />
      )} {name}– {designation}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
