import { useState } from 'react';
import { Menu, X, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAccount: () => void;
  bookingCount: number;
}

export default function Header({ onNavigate, activeSection, onOpenAccount, bookingCount }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'estimator', label: 'Cost Estimator' },
    { id: 'how-it-works', label: 'Process' },
    { id: 'faqs', label: 'FAQ' },
  ];

  const handleClicks = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl border-b border-[#4d4635]/30 h-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-full">
        {/* Brand Logo */}
        <div 
          onClick={() => handleClicks('hero')}
          className="flex items-center gap-2 cursor-pointer group"
          id="brand-logo"
        >
          <Sparkles className="w-5 h-5 text-[#f2ca50] animate-pulse" />
          <span className="font-serif text-xl md:text-2xl font-bold tracking-widest text-[#f2ca50] transition-colors duration-300">
            A.K. HOME SERVICE
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClicks(item.id)}
              className={`font-sans font-bold uppercase tracking-widest text-xs transition-colors duration-300 hover:text-[#f2ca50] cursor-pointer ${
                activeSection === item.id ? 'text-[#f2ca50]' : 'text-[#d0c5af]'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={onOpenAccount}
            className="flex items-center gap-2 text-[#f2ca50] hover:text-[#ffe088] transition-colors relative ml-4 px-3 py-1.5 rounded-lg border border-[#f2ca50]/20 hover:border-[#f2ca50]/50 cursor-pointer"
            id="account-btn-desktop"
          >
            <User className="w-4 h-4" />
            <span className="text-xs font-bold font-sans uppercase tracking-widest">My Desk</span>
            {bookingCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#f2ca50] text-[#131313] font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                {bookingCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Menu Action Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onOpenAccount}
            className="p-1 px-2 border border-[#f2ca50]/20 text-[#f2ca50] rounded-lg text-xs font-bold uppercase relative"
            id="account-btn-mobile"
          >
            <User className="w-4 h-4" />
            {bookingCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f2ca50] text-[#131313] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {bookingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#f2ca50] hover:text-[#ffe088] focus:outline-none cursor-pointer"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card absolute top-20 left-0 w-full flex flex-col p-6 space-y-4 border-t border-[#4d4635]/30 bg-[#131313]/95 shadow-2xl animate-fade-in" id="mobile-drawer">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClicks(item.id)}
              className={`py-2 text-left font-sans font-bold uppercase tracking-widest text-[13px] transition-colors border-b border-[#4d4635]/10 ${
                activeSection === item.id ? 'text-[#f2ca50]' : 'text-[#d0c5af]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenAccount();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2 text-[#131313] gold-gradient font-bold p-3 rounded-lg text-xs uppercase tracking-widest mt-2 cursor-pointer"
          >
            <User className="w-4 h-4" />
            My Desk ({bookingCount})
          </button>
        </div>
      )}
    </header>
  );
}
