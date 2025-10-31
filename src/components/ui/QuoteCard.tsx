import React from 'react';
import Image from 'next/image'
interface QuoteCardProps {
  quote: string;
  name: string;
  designation: string;
  imageSrc?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QuoteCard = (quote: any) => {

  console.log("----- quote in teh quote ----",quote);
  return (
    <div className="flex items-center rounded-lg bg-[#F3F5F7] max-w-[403px] mx-auto">
      {/* Image */}


      {/* Content */}
      <div className="flex flex-col p-5">
        <Image height={100} width={100} src="/Vector_hang.png" alt="Quote Icon" className="w-10 h-10 mb-4 px-1 py-2" />
        <p className="subtext !leading-7 !text-[#1A0F33]  mb-4">{quote?.content}</p>
        <p className="mt-0 subtext !leading-10 flex items-center border-t-2 pt-4 border-white">
          {/* {imageSrc && (
            <Image height={100} width={100} src={imageSrc} alt={name} className="w-[30px] h-30px rounded-full mr-3" />
          )}  */}
          {quote?.name}– {quote?.profession}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
