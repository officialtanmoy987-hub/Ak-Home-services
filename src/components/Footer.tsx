import { Sparkles } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-16 bg-[#0e0e0e] border-t border-[#4d4635]/30 flex flex-col items-center text-center px-6 md:px-12 space-y-6 z-20 relative">
      <div 
        onClick={handleScrollToTop}
        className="font-serif text-2xl md:text-3xl text-[#f2ca50] tracking-widest uppercase font-extrabold cursor-pointer hover:text-[#ffe088] transition-colors flex items-center gap-2"
        id="footer-logo"
      >
        <Sparkles className="w-5 h-5 text-[#f2ca50] animate-pulse" />
        A.K. HOME SERVICE
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-2xl text-xs md:text-sm">
        <a className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors duration-300 font-sans" href="#services">
          Bespoke Solutions
        </a>
        <a className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors duration-300 font-sans" href="#stats">
          Why Aura
        </a>
        <a className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors duration-300 font-sans" href="#estimator">
          Fee Estimator
        </a>
        <a className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors duration-300 font-sans" href="#faqs">
          Privacy Assured FAQs
        </a>
      </div>

      <div className="pt-4 border-t border-[#4d4635]/15 w-full max-w-xl text-[10px] md:text-xs">
        <p className="text-[#7b7a79] leading-relaxed">
          © {new Date().getFullYear()} A.K. HOME SERVICE. ALL RESERVATIONS SECURITY-AUDITED. PRIVACY PRESERVED.
        </p>
        <p className="text-[#7b7a79] opacity-40 mt-1">
          Handcrafted luxury home care solutions for the elite residents of Ahmedabad, Gujarat.
        </p>
      </div>
    </footer>
  );
}
