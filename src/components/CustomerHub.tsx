import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking, ServiceType, Testimonial } from '../types.ts';
import { SERVICE_CATEGORIES } from '../data.ts';
import { Sparkles, Calendar, Trash2, Heart, Award, Star, StarOff, CheckCircle2, XCircle, Clock, ChevronRight, UserCheck } from 'lucide-react';

interface CustomerHubProps {
  bookings: Booking[];
  isOpen: boolean;
  onClose: () => void;
  onCancelBooking: (bookingId: string) => void;
  onSubmitReview: (review: { serviceType: ServiceType; rating: number; text: string; author: string }) => void;
}

export default function CustomerHub({ bookings, isOpen, onClose, onCancelBooking, onSubmitReview }: CustomerHubProps) {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviewedBookings, setReviewedBookings] = useState<string[]>([]);

  if (!isOpen) return null;

  const activeBookings = bookings.filter(b => b.status === 'confirmed');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const handleReviewSubmission = (booking: Booking) => {
    if (!reviewText.trim()) return;
    
    onSubmitReview({
      serviceType: booking.serviceType,
      rating,
      text: reviewText,
      author: booking.customerName
    });

    setReviewedBookings([...reviewedBookings, booking.id]);
    setReviewText('');
    setSelectedBookingId(null);
  };

  const calculateUserStats = () => {
    let spend = 0;
    let days = 0;
    bookings.forEach(b => {
      if (b.status === 'confirmed' || b.status === 'completed') {
        spend += b.costEstimate;
        days += b.durationDays;
      }
    });
    return { spend, days };
  };

  const { spend, days } = calculateUserStats();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-end">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Client Desk Slide-over bar panel */}
        <motion.div 
          initial={{ x: '100%', opacity: 0.9 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="relative w-full max-w-lg h-full glass-card border-l border-[#f2ca50]/20 bg-[#131313] shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#4d4635]/30 bg-[#1c1b1b] flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#f2ca50] animate-pulse" />
              <div>
                <h3 className="font-serif text-lg md:text-xl font-bold text-[#e5e2e1]">
                  My VIP Desk
                </h3>
                <p className="text-[10px] text-[#7b7a79] font-sans font-medium uppercase tracking-widest mt-0.5 animate-pulse">
                  Bespoke Relationship Portal
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1 px-1.5 rounded-md border border-[#4d4635]/40 text-[#d0c5af] hover:text-white hover:bg-[#353534]/50 cursor-pointer"
            >
              Close Hub
            </button>
          </div>

          {/* Scrollable Desk content panel */}
          <div className="p-6 overflow-y-auto flex-grow space-y-6">
            
            {/* VIP Status Summary Card */}
            <div className="p-4 bg-gradient-to-br from-[#1c1b1b] to-[#0e0e0e] border border-[#f2ca50]/15 rounded-xl space-y-3">
              <span className="text-[10px] uppercase font-sans font-extrabold tracking-wider text-[#7b7a79] block">
                Relationship Tiers
              </span>
              <div className="flex justify-between items-center">
                <span className="text-[#f2ca50] font-serif text-lg font-bold">
                  Sovereign Client Access
                </span>
                <span className="px-2 py-0.5 rounded bg-[#f2ca50]/10 border border-[#f2ca50]/25 text-[#f2ca50] text-[9px] font-sans font-bold uppercase">
                  ACTIVE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#4d4635]/15 text-center">
                <div>
                  <span className="block text-[9px] text-[#7b7a79] uppercase font-semibold">Total Staged Spend</span>
                  <span className="text-[#f2ca50] font-mono text-sm font-bold">₹{spend.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#7b7a79] uppercase font-semibold">Staged Care Days</span>
                  <span className="text-[#e5e2e1] font-mono text-sm font-semibold">{days} Days</span>
                </div>
              </div>
            </div>

            {/* list bookings */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#4d4635]/15 pb-2">
                <span className="text-xs font-bold font-sans uppercase tracking-widest text-[#d0c5af]">
                  Active Reservations ({activeBookings.length})
                </span>
              </div>

              {activeBookings.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#7b7a79] border border-dashed border-[#4d4635]/20 rounded-lg">
                  No active luxury placements currently registered.
                </div>
              ) : (
                <div className="space-y-3">
                  {activeBookings.map((b) => {
                    const servicesCategory = SERVICE_CATEGORIES.find(s => s.id === b.serviceType);
                    return (
                      <div key={b.id} className="p-4 rounded-lg bg-[#201f1f]/60 border border-[#4d4635]/25 space-y-3 relative overflow-hidden group">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 rounded bg-[#f2ca50]/12 text-[#ffe088] text-[9px] font-mono font-bold uppercase">
                              #{b.id} Confirmed
                            </span>
                            <h4 className="font-serif text-sm font-bold text-white leading-tight">
                              {servicesCategory?.name} - {b.subcategory}
                            </h4>
                          </div>
                          
                          <button
                            onClick={() => onCancelBooking(b.id)}
                            className="p-1.5 text-[#7b7a79] hover:text-[#ffb4ab] rounded-md hover:bg-[#353534]/50 cursor-pointer"
                            title="Cancel placement reservation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Staging stats line and assigned status */}
                        <div className="grid grid-cols-2 gap-3 text-[11px] bg-[#131313]/55 p-2 rounded border border-[#4d4635]/10 font-sans">
                          <div>
                            <span className="text-[#7b7a79] uppercase text-[9px] block">Start Placement</span>
                            <span className="text-white font-medium">{b.date} at {b.time}</span>
                          </div>
                          <div>
                            <span className="text-[#7b7a79] uppercase text-[9px] block">Bespoke Duration</span>
                            <span className="text-white font-medium">{b.durationDays} days ({b.expertiseLevel.toUpperCase()})</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-[#d0c5af]">
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#f2ca50]">
                            ₹{b.costEstimate.toLocaleString('en-IN')}
                          </span>
                          <span className="flex items-center gap-1 text-[#ffe088] bg-[#f2ca50]/5 px-2 py-0.5 rounded font-bold uppercase uppercase tracking-wider text-[9px]">
                            <UserCheck className="w-3.5 h-3.5" />
                            Concierge Assigned
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Past Bookings & Leave Reviews */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#4d4635]/15 pb-2">
                <span className="text-xs font-bold font-sans uppercase tracking-widest text-[#d0c5af]">
                  Placement History & Reviews ({pastBookings.length})
                </span>
              </div>

              {pastBookings.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#7b7a79]">
                  No archived luxury placements reported. Complete an active booking to register.
                </div>
              ) : (
                <div className="space-y-3">
                  {pastBookings.map((b) => {
                    const isCancelled = b.status === 'cancelled';
                    const hasReviewed = reviewedBookings.includes(b.id);
                    const isReviewFormOpen = selectedBookingId === b.id;

                    return (
                      <div key={b.id} className="p-4 rounded-lg bg-[#1c1b1b]/40 border border-[#4d4635]/15 text-xs space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[#7b7a79] uppercase tracking-wider">#{b.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-sans font-bold uppercase tracking-wider ${
                            isCancelled 
                              ? 'bg-[#93000a]/10 text-[#ffb4ab] border border-[#ffb4ab]/10' 
                              : 'bg-[#353534]/50 text-[#d0c5af]'
                          }`}>
                            {b.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="font-serif font-bold text-[#e5e2e1]">
                          {b.subcategory} ({b.serviceType.toUpperCase()})
                        </div>
                        <div className="text-[#d0c5af] text-[11px] leading-relaxed">
                          Placed on: {b.date} for {b.durationDays} days. Total Sum: ₹{b.costEstimate.toLocaleString('en-IN')}.
                        </div>

                        {/* Review trigger helper */}
                        {!isCancelled && !hasReviewed && (
                          <div className="pt-2 border-t border-[#4d4635]/10">
                            {isReviewFormOpen ? (
                              <div className="space-y-3 bg-[#131313]/80 p-3 rounded border border-[#f2ca50]/15 mt-2 animate-fade-in">
                                <div className="flex justify-between items-center">
                                  <span className="text-[9.5px] uppercase font-bold text-[#f2ca50]">Rate Experience</span>
                                  <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button
                                        type="button"
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className="text-[#f2ca50] cursor-pointer"
                                      >
                                        {rating >= star ? <Star className="w-3.5 h-3.5 fill-current" /> : <StarOff className="w-3.5 h-3.5" />}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <textarea
                                  placeholder="How did our premium staff perform? Leave a discretionary review."
                                  rows={2}
                                  value={reviewText}
                                  onChange={(e) => setReviewText(e.target.value)}
                                  className="w-full p-2 bg-[#1c1b1b] border border-[#4d4635]/30 rounded text-xs text-white focus:outline-none focus:border-[#f2ca50]"
                                />
                                <div className="flex justify-between items-center pt-1.5">
                                  <button
                                    onClick={() => setSelectedBookingId(null)}
                                    className="text-[10px] font-bold text-[#7b7a79] hover:text-white uppercase"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleReviewSubmission(b)}
                                    className="px-4 py-1.5 gold-gradient text-[#3c2f00] text-[10px] font-bold rounded uppercase tracking-wider hover:opacity-90"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => setSelectedBookingId(b.id)}
                                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded bg-[#f2ca50]/5 border border-[#f2ca50]/20 text-[#f2ca50] font-sans font-bold uppercase tracking-wider text-[10px] hover:bg-[#f2ca50]/15"
                              >
                                <Star className="w-3.5 h-3.5" />
                                Review This Placement
                              </button>
                            )}
                          </div>
                        )}

                        {hasReviewed && (
                          <div className="pt-2 border-t border-[#4d4635]/15 text-[#ffe088] font-semibold text-[9.5px] uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Review logged into dynamic system catalog
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Footer contact quick response */}
          <div className="p-6 bg-[#0e0e0e] border-t border-[#4d4635]/30 shrink-0 space-y-3">
            <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#7b7a79] block text-center">
              Direct Contact Support Staging
            </span>
            <div className="flex gap-3">
              <a 
                href="https://wa.me/917426952117"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center py-3 bg-[#25d366]/10 text-[#25d366] border border-[#25d366]/30 hover:bg-[#25d366]/20 transition-all font-bold text-xs rounded uppercase tracking-wider"
              >
                Launch Chat Support
              </a>
              <a 
                href="tel:+917426952117"
                className="flex-1 text-center py-3 bg-[#f2ca50]/8 text-[#f2ca50] border border-[#f2ca50]/30 hover:bg-[#f2ca50]/15 transition-all font-bold text-xs rounded uppercase tracking-wider"
              >
                Call Concierge Direct
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
