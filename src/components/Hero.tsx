import { motion } from 'motion/react';
import { CalendarRange, MessageCircle, MapPin } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
  onExplore: () => void;
}

export default function Hero({ onBookNow, onExplore }: HeroProps) {
  return (
    <section 
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 md:px-12 pt-32 pb-16 overflow-hidden"
    >
      {/* Premium Ambient Background Blur Nodes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#f2ca50]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-4xl mx-auto space-y-6 relative z-10"
      >
        {/* Subtle Luxury Pin */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#353534]/50 border border-[#4d4635]/40 text-[#f2ca50] text-[11px] font-sans font-bold uppercase tracking-widest">
          <MapPin className="w-3.5 h-3.5" />
          Ahmedabad's Premier Concierge
        </div>

        <h1 className="font-serif text-4xl md:text-7xl font-bold text-[#e5e2e1] tracking-tight leading-tight md:leading-[1.15]">
          Trusted Home Services in <br />
          <span className="text-[#f2ca50] italic font-normal gold-glow relative">
            Ahmedabad
            <span className="absolute left-0 bottom-1 w-full h-[2px] bg-gradient-to-r from-transparent via-[#f2ca50]/50 to-transparent"></span>
          </span>
        </h1>

        <p className="font-sans text-base md:text-xl text-[#d0c5af] max-w-2xl mx-auto leading-relaxed font-light">
          Bespoke living solutions for the discerning resident. From elite culinary masters to dedicated healthcare professionals and flawless estate maintenance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookNow}
            className="gold-gradient text-[#3c2f00] font-sans font-extrabold px-10 py-5 rounded-lg flex items-center gap-3 hover:shadow-[0_0_30px_rgba(242,202,80,0.35)] transition-all cursor-pointer text-sm uppercase tracking-wider"
            id="hero-book-btn"
          >
            Book Service 
            <CalendarRange className="w-4.5 h-4.5" />
          </motion.button>

          <motion.a 
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(242, 202, 80, 0.08)' }}
            whileTap={{ scale: 0.98 }}
            href="https://wa.me/917426952117"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[#f2ca50] text-[#f2ca50] px-10 py-[18px] rounded-lg font-sans font-extrabold flex items-center gap-3 transition-all text-sm uppercase tracking-wider bg-transparent"
            id="hero-whatsapp-btn"
          >
            WhatsApp Now 
            <MessageCircle className="w-4.5 h-4.5" />
          </motion.a>
        </div>

        {/* Highlight Banner */}
        <div className="pt-12 text-xs font-sans text-[#7b7a79] uppercase tracking-widest flex items-center justify-center gap-4">
          <span>Discretion Assured</span>
          <span className="w-1.5 h-1.5 bg-[#4d4635] rounded-full"></span>
          <span>Sourced Globally</span>
          <span className="w-1.5 h-1.5 bg-[#4d4635] rounded-full"></span>
          <span>Verified Local Delivery</span>
        </div>
      </motion.div>
    </section>
  );
}
