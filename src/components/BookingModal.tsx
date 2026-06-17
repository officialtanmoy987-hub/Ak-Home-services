import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICE_CATEGORIES } from '../data.ts';
import { ServiceType, ExpertiseLevel, Booking } from '../types.ts';
import { X, Check, Calendar, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveBooking: (booking: Booking) => void;
  prefilledData: {
    serviceType: ServiceType;
    subcategory: string;
    durationDays: number;
    expertiseLevel: ExpertiseLevel;
    costEstimate: number;
  } | null;
}

export default function BookingModal({ isOpen, onClose, onSaveBooking, prefilledData }: BookingModalProps) {
  const [serviceType, setServiceType] = useState<ServiceType>('maid');
  const [subcategory, setSubcategory] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('09:00');
  const [duration, setDuration] = useState<number>(3);
  const [expertise, setExpertise] = useState<ExpertiseLevel>('elite');
  const [requirements, setRequirements] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  
  const [successAnimation, setSuccessAnimation] = useState<boolean>(false);

  const selectedServiceObj = SERVICE_CATEGORIES.find(s => s.id === serviceType)!;

  // Sync pre-filled data if available
  useEffect(() => {
    if (prefilledData) {
      setServiceType(prefilledData.serviceType);
      
      // Look up subcategory ID by name
      const matchingSub = SERVICE_CATEGORIES.find(s => s.id === prefilledData.serviceType)
        ?.subcategories.find(sub => sub.name === prefilledData.subcategory);
      
      setSubcategory(matchingSub ? matchingSub.id : '');
      setDuration(prefilledData.durationDays);
      setExpertise(prefilledData.expertiseLevel);
    } else {
      setSubcategory(selectedServiceObj.subcategories[0]?.id || '');
    }
    
    // Set minimal logical booking date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, [prefilledData, isOpen]);

  // Handle service type toggle
  useEffect(() => {
    if (!prefilledData) {
      setSubcategory(selectedServiceObj.subcategories[0]?.id || '');
    }
  }, [serviceType]);

  const activeSubcategory = selectedServiceObj.subcategories.find(sub => sub.id === subcategory) || selectedServiceObj.subcategories[0];
  const baseRate = activeSubcategory ? activeSubcategory.pricePerDay : selectedServiceObj.basePrice;
  
  let multiplier = 1.0;
  if (expertise === 'elite') multiplier = 1.5;
  if (expertise === 'royal') multiplier = 2.2;

  const costEstimate = baseRate * duration * multiplier;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) return;

    const newBooking: Booking = {
      id: 'BK-' + Math.floor(1000 + Math.random() * 9000),
      serviceType,
      subcategory: activeSubcategory?.name || 'Standard Package',
      date,
      time,
      durationDays: duration,
      expertiseLevel: expertise,
      specialRequirements: requirements,
      customerName: name,
      customerPhone: phone,
      status: 'confirmed', // Luxury instant confirmation!
      costEstimate,
      createdAt: new Date().toISOString()
    };

    onSaveBooking(newBooking);
    
    // Play stunning confirmation animation
    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
      onClose();
      // Reset
      setRequirements('');
      setName('');
      setPhone('');
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-3xl glass-card rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.15)] bg-[#131313] max-h-[90vh] flex flex-col"
        >
          {successAnimation ? (
            <div className="p-12 flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[450px]">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 120 }}
                className="w-20 h-20 bg-[#f2ca50] text-[#131313] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(242,202,80,0.5)]"
              >
                <Check className="w-10 h-10 stroke-[3]" />
              </motion.div>
              <h3 className="font-serif text-3xl font-bold text-[#e5e2e1] tracking-tight">
                Reservation Confirmed
              </h3>
              <p className="text-[#d0c5af] max-w-sm text-sm font-light leading-relaxed">
                Thank you, <span className="font-semibold text-white">{name}</span>. Your bespoke concierge representative is auditing this reservation. Check "My Desk" for real-time status.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-6 border-b border-[#4d4635]/30 flex justify-between items-center bg-[#1c1b1b]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#f2ca50] animate-pulse" />
                  <div>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-[#e5e2e1]">
                      Luxury Service Placement
                    </h3>
                    <p className="text-[10px] text-[#7b7a79] font-sans font-medium uppercase tracking-widest mt-0.5">
                      Secure Instant Professional Staging
                    </p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 px-1.5 rounded-md border border-[#4d4635]/40 text-[#d0c5af] hover:text-white hover:bg-[#353534]/50 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body Scrollable */}
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-grow max-h-[70vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column Controls */}
                  <div className="space-y-4">
                    <span className="text-[#f2ca50] font-sans font-bold uppercase tracking-wider text-[10px] block border-b border-[#4d4635]/15 pb-1">
                      1. Service Setup Calibrators
                    </span>
                    
                    {/* Service Type Selection */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider">Service Vertical</label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value as ServiceType)}
                        className="w-full p-3 bg-[#1c1b1b] border border-[#4d4635]/40 rounded-lg text-sm text-white focus:border-[#f2ca50] focus:outline-none"
                      >
                        {SERVICE_CATEGORIES.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Subcategories Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider">Bespoke Specialty Plan</label>
                      <select
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        className="w-full p-3 bg-[#1c1b1b] border border-[#4d4635]/40 rounded-lg text-sm text-white focus:border-[#f2ca50] focus:outline-none"
                      >
                        {selectedServiceObj.subcategories.map(s => (
                          <option key={s.id} value={s.id}>{s.name} - ₹{s.pricePerDay}/day</option>
                        ))}
                      </select>
                    </div>

                    {/* Credential tier selection */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider">Credential Level</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['standard', 'elite', 'royal'] as ExpertiseLevel[]).map((exp) => (
                          <button
                            type="button"
                            key={exp}
                            onClick={() => setExpertise(exp)}
                            className={`p-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${
                              expertise === exp
                                ? 'border-[#f2ca50] bg-[#f2ca50]/10 text-[#f2ca50]'
                                : 'border-[#4d4635]/15 bg-transparent text-[#7b7a79] hover:border-[#f2ca50]/20'
                            }`}
                          >
                            {exp}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date & Time Setup */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider">Calendar Date</label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full p-3 bg-[#1c1b1b] border border-[#4d4635]/40 rounded-lg text-sm text-white focus:border-[#f2ca50] focus:outline-none focus:ring-1 focus:ring-[#f2ca50]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider">Preferred Time</label>
                        <input
                          type="time"
                          required
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full p-3 bg-[#1c1b1b] border border-[#4d4635]/40 rounded-lg text-sm text-white focus:border-[#f2ca50] focus:outline-none focus:ring-1 focus:ring-[#f2ca50]"
                        />
                      </div>
                    </div>

                    {/* Duration slider in modal too */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider">
                        <span>Duration Period</span>
                        <span className="text-[#f2ca50] font-mono">{duration} days</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        className="w-full h-1 bg-[#131313] rounded-lg appearance-none cursor-pointer accent-[#f2ca50] outline-none border border-[#4d4635]/30"
                      />
                    </div>
                  </div>

                  {/* Right Column details & contacts */}
                  <div className="space-y-4">
                    <span className="text-[#f2ca50] font-sans font-bold uppercase tracking-wider text-[10px] block border-b border-[#4d4635]/15 pb-1">
                      2. Destination & Contacts
                    </span>

                    {/* Custom Customer Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider">Customer Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Singhania"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 bg-[#1c1b1b] border border-[#4d4635]/45 rounded-lg text-sm text-white focus:border-[#f2ca50] focus:outline-none focus:ring-1 focus:ring-[#f2ca50]"
                      />
                    </div>

                    {/* Contact Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider">Contact WhatsApp/Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 bg-[#1c1b1b] border border-[#4d4635]/45 rounded-lg text-sm text-white focus:border-[#f2ca50] focus:outline-none focus:ring-1 focus:ring-[#f2ca50]"
                      />
                    </div>

                    {/* Highly Special requirements */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#d0c5af] uppercase tracking-wider">Discreet Specifications / Requirements</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Specific food preparation allergens, physical walking regimens, or delicate cashmere care directives."
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        className="w-full p-3 bg-[#1c1b1b] border border-[#4d4635]/45 rounded-lg text-xs text-white focus:border-[#f2ca50] focus:outline-none focus:ring-1 focus:ring-[#f2ca50]"
                      />
                    </div>

                    {/* Price breakdown and instant confirm button */}
                    <div className="p-4 bg-[#201f1f] rounded-lg border border-[#f2ca50]/15 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#7b7a79]">Aggregate Base Rate:</span>
                        <span className="font-mono text-white text-xs">₹{(baseRate * duration).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#7b7a79]">Credential Premium Multiplier:</span>
                        <span className="font-mono text-[#f2ca50] text-[#ffe088] font-bold">{multiplier}x Class ({expertise.toUpperCase()})</span>
                      </div>
                      <div className="pt-2 border-t border-[#4d4635]/15 flex justify-between items-end">
                        <span className="text-[10px] uppercase font-sans font-bold text-[#7b7a79]">Bespoke Total Projected</span>
                        <span className="text-[#f2ca50] font-serif text-2xl font-extrabold gold-glow">₹{costEstimate.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Booking Submit triggers */}
                <div className="pt-4 border-t border-[#4d4635]/20 flex flex-col sm:flex-row gap-3 justify-end items-center">
                  <div className="text-[10px] text-[#7b7a79] font-sans flex items-center gap-1.5 sm:mr-auto">
                    <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
                    <span>Your private records are fully protected under non-disclosure.</span>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3 border border-[#4d4635]/40 rounded-lg text-xs font-bold uppercase tracking-wider text-[#d0c5af] hover:text-white cursor-pointer"
                  >
                    Cancel Order
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-3.5 rounded-lg text-xs font-extrabold uppercase tracking-wider text-[#3c2f00] gold-gradient hover:shadow-[0_4px_15px_rgba(242,202,80,0.3)] cursor-pointer"
                  >
                    Confirm Bespoke Order
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
