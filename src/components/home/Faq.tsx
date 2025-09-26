"use client";

import React, { useState } from "react";
import { Plus, Minus, ChevronRight } from "lucide-react";
// Individual FAQ Item
interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => setIsOpen(!isOpen);

    return (
        <div className="faq-item mb-6  bg-white p-5 rounded-lg shadow-md">
            <div
                className="faq-question text-[20px] font-semibold text-[#1A0F33] cursor-pointer flex items-center justify-between"
                onClick={toggleAnswer}
                aria-expanded={isOpen} // Accessibility: aria-expanded tells whether the answer is open
            >
                <span>{question}</span>
                {/* Toggle icon: Show Plus or Minus based on state */}
                {isOpen ? <Minus /> : <Plus />}
            </div>
            <div
                className={`faq-answer subtext !text-[#1A0F33] pt-2  transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
            >
                {answer}
            </div>
        </div>
    );
};

// FAQ Section Component
const FAQ: React.FC = () => {
    const faqs = [
        {
            question: "How long does it take to set up an eSIM?",
            answer:
                "Setup is quick and easy! Once you purchase a plan, you'll receive a QR code by email. Just scan it and your eSIM will be ready within minutes.",
        },
        {
            question: "Is eSIM secure?",
            answer:
                "Yes, eSIM is secure. It uses modern encryption methods to ensure the safety and privacy of your data.",
        },
        {
            question: "Can I use my eSIM alongside my physical SIM?",
            answer:
                "Yes, you can use both eSIM and physical SIM simultaneously if your device supports dual SIM functionality.",
        },
        {
            question: "What happens when I run out of data?",
            answer:
                "You can purchase additional data or switch to another plan. You'll be notified when your data is nearing its limit.",
        },
        {
            question: "What if I face issues while activating my eSIM?",
            answer:
                "If you encounter any issues, please contact customer support, and we'll help you troubleshoot and activate your eSIM.",
        },
    ];

    return (
        <div className="faq-container bg-[#E5EFF780] mt-25 pb-24">
            <div className="container">
                <div className="flex gap-19 items-center flex-col md:flex-row py-[90px]">
                    <div className="w-[55%]">
                        <img src="/faq.png" alt="FAQ Illustration" className="w-full h-auto" />
                    </div>
                    <div className="w-[auto]">
                        <div className="faq-header text-start mb-4">
                            <h2 className="h1">Frequently Asked Questions</h2>
                            <p className="subtext !text-[20px] mt-2 max-w-xl">
                                Everything you need to know about eSIM, setup, and staying connected abroad.
                            </p>
                        </div>

                        <div className="faq-list mt-12">
                            {faqs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                        <a href-="/" className="subtext !text-xl flex items-center gap-2">
                            View All FAQs <ChevronRight className="w-5 h-5 text-gray-500" />

                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
