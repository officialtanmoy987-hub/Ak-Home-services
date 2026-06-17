import { motion } from 'motion/react';
import { Testimonial } from '../types.ts';
import { Star, MessageSquare } from 'lucide-react';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialSectionProps) {
  return (
    <section className="py-20 bg-[#0e0e0e]/30 border-t border-[#4d4635]/15 relative z-10" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#f2ca50] font-sans font-bold uppercase tracking-widest text-xs">Aura Confirmed Reviews</span>
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#e5e2e1] tracking-tight">Discreet Resident Testimonials</h2>
          <p className="text-[#d0c5af] max-w-lg mx-auto text-sm font-light">
            Genuine assessments from high-net-worth families in Bodakdev, Satellite, and Science City, Ahmedabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-xl flex flex-col justify-between items-stretch bg-[#1c1b1b]/40 relative group hover:border-[#f2ca50]/30 transition-all duration-300"
            >
              <div className="absolute top-6 right-6 text-[#f2ca50]/15 group-hover:text-[#f2ca50]/30 transition-colors">
                <MessageSquare className="w-10 h-10" />
              </div>

              <div className="space-y-4">
                {/* Stars ratings */}
                <div className="flex gap-1 text-[#f2ca50]">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current text-[#f2ca50]" />
                  ))}
                </div>

                <p className="font-serif text-sm md:text-base text-[#e5e2e1]/95 italic leading-relaxed pl-1 border-l-2 border-[#f2ca50]/40">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#4d4635]/10 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-sans font-bold text-white tracking-wide">
                    {t.author}
                  </h4>
                  <span className="text-[#7b7a79] text-[10px] font-sans block uppercase mt-0.5 font-medium">
                    {t.role || 'Sovereign Client'}
                  </span>
                </div>
                <span className="text-[#7b7a79] text-[9px] font-mono whitespace-nowrap">
                  {t.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
