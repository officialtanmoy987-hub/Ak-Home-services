import { useState, useEffect } from 'react';
import { SERVICE_CATEGORIES } from '../data.ts';
import { ServiceType, ExpertiseLevel } from '../types.ts';
import { Calculator, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';

interface EstimatorProps {
  onProceedToBook: (prefilled: {
    serviceType: ServiceType;
    subcategory: string;
    durationDays: number;
    expertiseLevel: ExpertiseLevel;
    costEstimate: number;
  }) => void;
  initialService?: ServiceType;
  initialSubcategory?: string;
}

export default function Estimator({ onProceedToBook, initialService, initialSubcategory }: EstimatorProps) {
  const [serviceType, setServiceType] = useState<ServiceType>(initialService || 'maid');
  const [subcategory, setSubcategory] = useState<string>('');
  const [duration, setDuration] = useState<number>(7);
  const [expertise, setExpertise] = useState<ExpertiseLevel>('elite');

  const selectedServiceObj = SERVICE_CATEGORIES.find(s => s.id === serviceType)!;

  // Whenever service changes, set subcategory default to the first one available
  useEffect(() => {
    if (initialService === serviceType && initialSubcategory) {
      setSubcategory(initialSubcategory);
    } else {
      setSubcategory(selectedServiceObj.subcategories[0]?.id || '');
    }
  }, [serviceType]);

  const activeSubcategoryObj = selectedServiceObj.subcategories.find(sub => sub.id === subcategory) || selectedServiceObj.subcategories[0];

  // Calculate prices
  const baseRate = activeSubcategoryObj ? activeSubcategoryObj.pricePerDay : selectedServiceObj.basePrice;
  
  let brandMultiplier = 1.0;
  if (expertise === 'elite') brandMultiplier = 1.5;
  if (expertise === 'royal') brandMultiplier = 2.2;

  const totalEstimate = baseRate * duration * brandMultiplier;

  const handleBook = () => {
    onProceedToBook({
      serviceType,
      subcategory: activeSubcategoryObj?.name || 'Standard Plan',
      durationDays: duration,
      expertiseLevel: expertise,
      costEstimate: totalEstimate
    });
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 relative z-10" id="estimator">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#d4af37]/4 rounded-full blur-[130px] pointer-events-none" />
      
      <div className="text-center mb-12 space-y-3">
        <span className="text-[#f2ca50] font-sans font-bold uppercase tracking-widest text-xs">Dynamic Quotation</span>
        <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#e5e2e1] tracking-tight">Bespoke Pricing Estimator</h2>
        <p className="text-[#d0c5af] max-w-2xl mx-auto text-sm font-light">
          Calibrate your bespoke home package layout. Review real-time estimates transparently with zero concealed fees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Calibrator controls */}
        <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* 1. Service Sector Selection */}
            <div className="space-y-3">
              <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#d0c5af]">
                Step 1: Elite Service Vertical
              </label>
              <div className="grid grid-cols-3 gap-3">
                {SERVICE_CATEGORIES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceType(s.id)}
                    className={`p-3.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                      serviceType === s.id
                        ? 'border-[#f2ca50] bg-[#f2ca50]/5 text-[#f2ca50]'
                        : 'border-[#4d4635]/20 bg-[#1c1b1b]/40 text-[#d0c5af] hover:border-[#f2ca50]/40'
                    }`}
                  >
                    <span className="text-xs font-bold font-sans tracking-wide uppercase">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Subcategory Dropdown / Selectors */}
            <div className="space-y-3">
              <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#d0c5af]">
                Step 2: Care Specialty Plan
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {selectedServiceObj.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSubcategory(sub.id)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      subcategory === sub.id
                        ? 'border-[#f2ca50] bg-[#2a2a2a]/40 text-[#ffe088]'
                        : 'border-[#4d4635]/15 bg-transparent text-[#d0c5af] hover:border-[#f2ca50]/30'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{sub.name}</div>
                    <div className="text-[10px] text-[#7b7a79] truncate mt-0.5">₹{sub.pricePerDay.toLocaleString('en-IN')}/day</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Duration slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[11px] font-sans font-bold uppercase tracking-wider text-[#d0c5af]">
                <span>Step 3: Service Duration</span>
                <span className="text-[#f2ca50] font-mono text-xs">{duration} {duration === 1 ? 'Day' : 'Days'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full h-1 bg-[#131313] rounded-lg appearance-none cursor-pointer accent-[#f2ca50] outline-none border border-[#4d4635]/30"
              />
              <div className="flex justify-between items-center text-[9px] text-[#7b7a79] font-sans uppercase">
                <span>1 Day</span>
                <span>1 Week</span>
                <span>15 Days</span>
                <span>1 Month (30 Days)</span>
              </div>
            </div>

            {/* 4. Credentials / Expertise select */}
            <div className="space-y-3">
              <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#d0c5af]">
                Step 4: Pro Credential Class
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setExpertise('standard')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    expertise === 'standard'
                      ? 'border-[#f2ca50] bg-[#2a2a2a]/40 text-[#f2ca50]'
                      : 'border-[#4d4635]/20 bg-transparent text-[#7b7a79] hover:border-[#f2ca50]/30'
                  }`}
                >
                  <span className="text-xs font-bold block uppercase text-[#e5e2e1]">Standard Class</span>
                  <span className="text-[10px] block text-[#7b7a79] mt-1 font-light leading-relaxed">Certified Pro (1.0x Rate)</span>
                </button>
                <button
                  onClick={() => setExpertise('elite')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    expertise === 'elite'
                      ? 'border-[#f2ca50] bg-[#2a2a2a]/40 text-[#f2ca50]'
                      : 'border-[#4d4635]/20 bg-transparent text-[#7b7a79] hover:border-[#f2ca50]/30'
                  }`}
                >
                  <span className="text-xs font-bold block uppercase text-[#e5e2e1]">Elite Masters</span>
                  <span className="text-[10px] block text-[#7b7a79] mt-1 font-light leading-relaxed">10+ Years & Premium Estate Refs (1.5x Rate)</span>
                </button>
                <button
                  onClick={() => setExpertise('royal')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    expertise === 'royal'
                      ? 'border-[#f2ca50] bg-[#2a2a2a]/40 text-[#f2ca50]'
                      : 'border-[#4d4635]/20 bg-transparent text-[#7b7a79] hover:border-[#f2ca50]/30'
                  }`}
                >
                  <span className="text-xs font-bold block uppercase text-[#e5e2e1]">Royal Sovereign</span>
                  <span className="text-[10px] block text-[#7b7a79] mt-1 font-light leading-relaxed">Celebrity Checked & Global Standards (2.2x Rate)</span>
                </button>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#7b7a79] font-sans flex items-center gap-1.5 pt-4">
            <AlertCircle className="w-4 h-4 text-[#f2ca50] shrink-0" />
            Pricing includes organic consumables, basic support management, and 24/7 client portal oversight.
          </div>
        </div>

        {/* Right Side: Pricing statement & conversion call banner */}
        <div className="lg:col-span-5 glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between items-stretch border border-[#f2ca50]/20 bg-gradient-to-b from-[#1c1b1b] to-[#131313]">
          <div>
            <div className="flex items-center gap-2 text-[#f2ca50] border-b border-[#4d4635]/30 pb-4 mb-6">
              <Calculator className="w-5 h-5" />
              <span className="text-xs font-bold font-sans uppercase tracking-widest leading-none">Bespoke Cost Statement</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-[#d0c5af]">
                <span>Base Specialty Rate:</span>
                <span className="font-mono text-[#e5e2e1] font-semibold">
                  ₹{baseRate?.toLocaleString('en-IN') || 0} / Day
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#d0c5af]">
                <span>Duration Period:</span>
                <span className="font-mono text-[#e5e2e1] font-semibold">
                  {duration} {duration === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#d0c5af]">
                <span>Credential Premium multiplier:</span>
                <span className="font-mono text-[#ffe088] font-bold">
                  {brandMultiplier}x ({expertise.toUpperCase()})
                </span>
              </div>

              <div className="pt-4 border-t border-[#4d4635]/30 my-4 space-y-1.5">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#7b7a79] block">
                  Projected Sum Total
                </span>
                <div className="text-3xl md:text-4xl text-[#f2ca50] font-bold text-glow font-serif">
                  ₹{totalEstimate.toLocaleString('en-IN')}
                </div>
                <p className="text-[10px] text-[#7b7a79] leading-relaxed">
                  *This estimate constitutes a high-fidelity projection. Taxes or special medical-consumable premiums may apply.
                </p>
              </div>
            </div>

            {/* Feature Trust Bullets */}
            <div className="mt-6 space-y-2.5 border-t border-[#4d4635]/10 pt-4 text-xs font-sans text-[#d0c5af]/90">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
                <span>Zero agency commissions or hidden billing fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#f2ca50]" />
                <span>Flexible cancellation with credit transfer</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={handleBook}
              className="w-full text-center text-[#3c2f00] gold-gradient font-sans font-extrabold py-4 px-6 rounded-lg text-xs uppercase tracking-wider hover:shadow-[0_4px_25px_rgba(242,202,80,0.3)] transition-all cursor-pointer block"
              id="estimator-secure-btn"
            >
              Secure This Estimate & Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
