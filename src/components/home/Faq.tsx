"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ChevronRight } from "lucide-react";
import Image from 'next/image'
interface FAQItemProps {
  question: string;
  answer: string;
  initiallyOpen?: boolean;
}

interface FAQProps {
  faqs: FAQItemProps[];
}

/* Single FAQ Item */
const FAQItem: React.FC<FAQItemProps> = ({ question, answer, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const toggleAnswer = () => setIsOpen((prev) => !prev);

  return (
    <div className="faq-item !text-left mb-6 bg-white p-5 rounded-xl shadow-md transition-all duration-300">
      <button
        onClick={toggleAnswer}
        className="faq-question text-[16px] leading-5 md:text-[20px] font-semibold text-[#1A0F33] w-full flex items-start justify-between focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-start">{question}</span>
        {isOpen ? <Minus className="w-5 h-5 text-[#1A0F33]" /> : <Plus className="w-5 h-5 text-[#1A0F33]" />}
      </button>

      <div
        className={` text-start faq-answer text-[#1A0F33] text-[14px] leading-4 md:text-[16px] md:leading-relaxed transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[800px] opacity-100 mt-3" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

/* Main FAQ Section */
const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  return (
    <section className="faq-container bg-[#E5EFF780] py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-start gap-16">
          {/* Left Illustration */}
          <div className="md:w-1/2 w-full">
            <Image
            height={700} width={700}
              src="/Foooter.jpg"
              alt="FAQ Illustration"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 w-full max-sm:text-center">
            <header className="faq-header mb-12">
              <h2 className="h1 text-[#1A0F33] mb-3">
                Frequently Asked Questions
              </h2>
              <p className="subtext md:!text-xl font-medium">
                Everything you need to know about eSIM, setup, and staying connected abroad.
              </p>
            </header>

            {/* FAQ List */}
            <div className="faq-list mt-10 ">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  initiallyOpen={index === 0} // ✅ First FAQ open by default
                />
              ))}
            </div>

            {/* View All Link using Next.js Link */}
            <Link
              href="/faq"
              className="text-[#64748B] text-xl font-medium flex items-center gap-2 mt-12 hover:underline transition-all"
            >
              View All FAQs
              <ChevronRight className="w-5 h-5 text-[#64748B]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
