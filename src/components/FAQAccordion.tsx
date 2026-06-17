import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data.ts';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 max-w-4xl mx-auto px-6 md:px-12 relative z-10" id="faqs">
      <div className="text-center mb-12 space-y-3">
        <span className="text-[#f2ca50] font-sans font-bold uppercase tracking-widest text-xs">Exacting Answers</span>
        <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#e5e2e1] tracking-tight">Frequently Answered Questions</h2>
        <p className="text-[#d0c5af] max-w-lg mx-auto text-sm font-light">
          Everything you need to verify before introducing our luxury specialists into your physical boundaries.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div 
              key={i}
              className={`glass-card rounded-lg overflow-hidden transition-all duration-300 ${
                isOpen ? 'border-[#f2ca50]/30 bg-[#201f1f]/35' : 'hover:border-[#f2ca50]/20'
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full p-5 md:p-6 text-left flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#f2ca50] shrink-0 mt-0.5" />
                  <span className="font-serif text-base md:text-lg font-bold text-[#e5e2e1] tracking-wide leading-tight">
                    {faq.q}
                  </span>
                </div>
                <div className="p-1 rounded-full bg-[#353534]/50 text-[#f2ca50] shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 md:px-6 pb-6 pt-1 border-t border-[#4d4635]/10 text-xs md:text-sm text-[#d0c5af] leading-relaxed font-light font-sans pl-11">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
