"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ChevronRight, ArrowRight } from "lucide-react";
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
    <div className="faq-item !text-left mb-6 bg-white p-5 rounded-xl  transition-all duration-300">
      <button
        onClick={toggleAnswer}
        className="faq-question text-[16px] leading-5 md:text-[20px] font-semibold text-[#1A0F33] w-full flex items-start justify-between focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-start">{question}</span>
        {isOpen ? <Minus className="w-5 h-5 text-[#1A0F33]" /> : <Plus className="w-5 h-5 text-[#1A0F33]" />}
      </button>

      <div
        className={` text-start faq-answer text-[#1A0F33] text-[14px] leading-4 md:text-[16px] md:leading-relaxed transition-all duration-300 ease-in-out ${isOpen ? "max-h-[800px] opacity-100 mt-3" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        {answer}
      </div>
    </div>
  );
};

/* Main FAQ Section */
const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const pathname = usePathname();
  return (
    <section className="faq-container bg-[#E5EFF780] py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-start gap-16">
          {/* Left Illustration */}
          <div className=" md:w-1/2 w-full relative">
            <Image
              height={700} width={700}
              src="/faq.webp"
              alt="FAQ Illustration"
              className="w-full h-auto  object-cover object-top rounded-xl"
            />
            <div className="absolute inset-0 !bg-[linear-gradient(to_top_right,#133366_15%,transparent_80%)] rounded-xl ">

            </div>
            <div className="flex flex-col gap-1 md:gap-2 z-10 p-2 sm:p-6 absolute bottom-1 md:bottom-4 left-0 md:left-3 w-full md:w-[90%]">
              <p className="text-white font-bold text-2xl md:text-4xl">
                Need help?
              </p>
              <p className="text-sm sm:text-[20px]  text-white mb-2 sm:mb-4">Our team is always ready to guide you through setup  selection—no matter where your journey takes you.</p>
              {/* <div className="flex"></div> */}
              <a className="flex gap-3 font-bold text-white text-sm sm:text-[20px]">Reach Out To Support <ArrowRight /></a>
              <a className="flex gap-3 font-bold text-white text-sm sm:text-[20px]">Chat On Whatsapp <ArrowRight /></a>
            </div>
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
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                faqs.map((faq: any, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    initiallyOpen={false} // ✅ First FAQ open by default
                  />
                ))}
            </div>

            {/* View All Link using Next.js Link */}
            {pathname !== "/faq" && (
              <Link
                href="/faq"
                className="text-[#64748B] text-[16px] md:text-xl font-medium flex items-center gap-2 mt-12 hover:underline transition-all"
              >
                View All FAQs
                <ChevronRight className="w-5 h-5 text-[#64748B]" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
