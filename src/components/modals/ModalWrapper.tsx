"use client";
import React from "react";
import { HiX } from "react-icons/hi";

interface ModalWrapperProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  widthClass?: string; // e.g. max-w-md, max-w-lg, max-w-xl
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  title,
  isOpen,
  onClose,
  children,
  footer,
  widthClass = "max-w-md",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`${widthClass} bg-white rounded-2xl shadow-2xl z-60 relative`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100 rounded-t-2xl">
          <h3 className="text-sm font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <HiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>

        {footer && (
          <div className="p-4 border-t border-gray-100 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
