import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowRight, Sparkles } from 'lucide-react';

// Data and Types
import { SERVICE_CATEGORIES, INITIAL_TESTIMONIALS } from './data.ts';
import { Booking, ServiceType, ExpertiseLevel, Testimonial } from './types.ts';

// Structured Sub-Components
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Stats from './components/Stats.tsx';
import ServicesPreview from './components/ServicesPreview.tsx';
import Estimator from './components/Estimator.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import Testimonials from './components/Testimonials.tsx';
import FAQAccordion from './components/FAQAccordion.tsx';
import Footer from './components/Footer.tsx';
import FloatingActions from './components/FloatingActions.tsx';
import BookingModal from './components/BookingModal.tsx';
import CustomerHub from './components/CustomerHub.tsx';

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Modal toggles
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  
  // Prefilled states
  const [prefilledBooking, setPrefilledBooking] = useState<{
    serviceType: ServiceType;
    subcategory: string;
    durationDays: number;
    expertiseLevel: ExpertiseLevel;
    costEstimate: number;
  } | null>(null);

  // Initialize and load state database from LocalStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem('ak_bookings');
    const savedTestimonials = localStorage.getItem('ak_testimonials');

    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      // Seed initial bookings for intuitive, high fidelity preview
      const initialSeed: Booking[] = [
        {
          id: 'BK-8842',
          serviceType: 'chef',
          subcategory: 'Fine Dining Celebration',
          date: '2026-06-25',
          time: '18:00',
          durationDays: 1,
          expertiseLevel: 'royal',
          specialRequirements: 'Gujarati-French fusion, non-spicy options for kids, premium presentation.',
          customerName: 'Anand Singhania',
          customerPhone: '+91 99245 42398',
          status: 'confirmed',
          costEstimate: 17600,
          createdAt: new Date().toISOString()
        },
        {
          id: 'BK-4123',
          serviceType: 'maid',
          subcategory: 'Deep Estate Cleaning',
          date: '2026-06-12',
          time: '09:00',
          durationDays: 2,
          expertiseLevel: 'elite',
          specialRequirements: 'Special deep care for polished white marble and cashmere closet sorting.',
          customerName: 'Shona Shah',
          customerPhone: '+91 79426 95117',
          status: 'completed',
          costEstimate: 10500,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setBookings(initialSeed);
      localStorage.setItem('ak_bookings', JSON.stringify(initialSeed));
    }

    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    } else {
      setTestimonials(INITIAL_TESTIMONIALS);
      localStorage.setItem('ak_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
    }

    // Scroll spy logic for active header indicator
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const sections = ['hero', 'services', 'estimator', 'how-it-works', 'faqs'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveBooking = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('ak_bookings', JSON.stringify(updated));
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b);
    setBookings(updated);
    localStorage.setItem('ak_bookings', JSON.stringify(updated));
  };

  const handleSubmitReview = (review: { serviceType: ServiceType; rating: number; text: string; author: string }) => {
    const newTestimonial: Testimonial = {
      id: 'TM-' + Math.floor(1000 + Math.random() * 9000),
      author: review.author,
      role: 'Verified Resident',
      content: review.text,
      serviceType: review.serviceType,
      rating: review.rating,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('ak_testimonials', JSON.stringify(updated));
  };

  const handleNavigateSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const handleQuickSelectService = (serviceId: ServiceType, subcategoryId?: string) => {
    const category = SERVICE_CATEGORIES.find(s => s.id === serviceId)!;
    
    // Auto populate estimated package rates
    let priceEstimate = category.basePrice;
    let subcategoryName = 'Standard Plan';
    
    if (subcategoryId) {
      const sub = category.subcategories.find(s => s.id === subcategoryId);
      if (sub) {
        priceEstimate = sub.pricePerDay;
        subcategoryName = sub.name;
      }
    }

    setPrefilledBooking({
      serviceType: serviceId,
      subcategory: subcategoryName,
      durationDays: 3,
      expertiseLevel: 'elite',
      costEstimate: priceEstimate * 3 * 1.5 // Default duration: 3 days, level: elite (1.5x)
    });
    setIsBookingOpen(true);
  };

  const handleProceedFromEstimator = (prefilled: {
    serviceType: ServiceType;
    subcategory: string;
    durationDays: number;
    expertiseLevel: ExpertiseLevel;
    costEstimate: number;
  }) => {
    setPrefilledBooking(prefilled);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] antialiased">
      {/* 1. Fixed Header */}
      <Header 
        onNavigate={handleNavigateSection}
        activeSection={activeSection}
        onOpenAccount={() => setIsAccountOpen(true)}
        bookingCount={bookings.filter(b => b.status === 'confirmed').length}
      />

      <main className="relative pt-20">
        {/* Ambient Top Shadow Highlight */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#f2ca50]/5 to-transparent pointer-events-none" />

        {/* 2. Hero Section */}
        <Hero 
          onBookNow={() => {
            setPrefilledBooking(null);
            setIsBookingOpen(true);
          }}
          onExplore={() => handleNavigateSection('services')}
        />

        {/* 3. Metrics Trust Stats */}
        <Stats />

        {/* 4. Interactive Services Catalog Preview */}
        <ServicesPreview onSelectService={handleQuickSelectService} />

        {/* 5. Cost Estimator / Quotation Calculator */}
        <Estimator 
          onProceedToBook={handleProceedFromEstimator}
          initialService={prefilledBooking?.serviceType}
          initialSubcategory={prefilledBooking?.subcategory}
        />

        {/* 6. Step Timeline journey */}
        <HowItWorks />

        {/* 7. Dynamic Testimonials Feed */}
        <Testimonials testimonials={testimonials} />

        {/* 8. Conversion Middle CTA Block */}
        <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 relative z-10" id="cta">
          <div className="glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden bg-gradient-to-br from-[#1c1b1b] to-[#131313] border border-[#f2ca50]/20">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#f2ca50]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#f2ca50]/5 blur-[100px] rounded-full pointer-events-none" />
            
            <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#e5e2e1] mb-6 tracking-tight leading-tight">
              Ready to transform your home life?
            </h2>
            <p className="text-[#d0c5af] max-w-2xl mx-auto mb-10 text-sm md:text-base font-light leading-relaxed">
              Our dedicated luxury concierge is standing by. Secure your premium domestic aid, private gourmet master, or companion team instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => {
                  setPrefilledBooking(null);
                  setIsBookingOpen(true);
                }}
                className="gold-gradient text-[#3c2f00] font-sans font-extrabold px-10 py-4.5 rounded-lg text-sm tracking-wider uppercase hover:shadow-[0_4px_25px_rgba(242,202,80,0.35)] transition-all cursor-pointer"
              >
                Inquire Now
              </button>
              <a 
                className="border border-[#4d4635] text-[#e5e2e1] hover:border-[#f2ca50] hover:text-[#f2ca50] px-10 py-4 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors bg-transparent flex items-center justify-center gap-2" 
                href="tel:+917426952117"
              >
                Call Concierge
                <Phone className="w-4 h-4 text-[#f2ca50]" />
              </a>
            </div>
          </div>
        </section>

        {/* 9. Privacy Assured FAQs Expandable */}
        <FAQAccordion />
      </main>

      {/* 10. Footers */}
      <Footer />

      {/* 11. Sticky/Mobile fixed navigation dock & float WhatsApp */}
      <FloatingActions 
        onOpenAccount={() => setIsAccountOpen(true)}
        onNavigate={handleNavigateSection}
        bookingCount={bookings.filter(b => b.status === 'confirmed').length}
      />

      {/* 12. Modals layer */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSaveBooking={handleSaveBooking}
        prefilledData={prefilledBooking}
      />

      <CustomerHub 
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
}
