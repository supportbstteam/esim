import React from 'react';

interface QuoteCardProps {
  quote: string;
  name: string;
  designation: string;
  imageSrc?: string;
}

const QuoteCard = ({ quote, name, designation, imageSrc }: QuoteCardProps) => {
  return (
    <div className="flex items-center p-5 rounded-lg bg-gray-100 shadow-lg max-w-lg mx-auto my-4">
      {/* Image */}
      {imageSrc && (
        <img src={imageSrc} alt={name} className="w-12 h-12 rounded-full mr-5" />
      )}

      {/* Content */}
      <div className="flex flex-col">
        <p className="text-lg italic text-gray-800">"{quote}"</p>
        <p className="mt-2 text-sm text-gray-600">
          <strong>{name}</strong> – {designation}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
