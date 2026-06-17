import { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICE_CATEGORIES } from '../data.ts';
import { ServiceType } from '../types.ts';
import { Sparkles, ChefHat, HeartHandshake, ChevronRight, AlertCircle, Info } from 'lucide-react';

interface ServicesPreviewProps {
  onSelectService: (serviceId: ServiceType, subcategoryId?: string) => void;
}

const ICON_MAP: Record<string, any> = {
  Sparkles: Sparkles,
  ChefHat: ChefHat,
  HeartHandshake: HeartHandshake,
};

export default function ServicesPreview({ onSelectService }: ServicesPreviewProps) {
  const [selectedTab, setSelectedTab] = useState<ServiceType>('maid');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const activeCategory = SERVICE_CATEGORIES.find(cat => cat.id === selectedTab)!;

  return (
    <section className="py-20 bg-[#0e0e0e]/40 border-y border-[#4d4635]/15 relative" id="services">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#131313] via-transparent to-[#131313] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-[#f2ca50] font-sans font-bold uppercase tracking-widest text-xs">Our Expertise</span>
            <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#e5e2e1] tracking-tight">Curated Categories</h2>
            <p className="text-[#d0c5af] max-w-xl text-sm md:text-base font-light">
              Select an expertise vertical to preview our detailed specialty profiles and certified care packages.
            </p>
          </div>

          {/* Tab buttons to toggle content details */}
          <div className="flex items-center gap-2 p-1 bg-[#201f1f] border border-[#4d4635]/30 rounded-lg shrink-0 overflow-x-auto w-full md:w-auto">
            {SERVICE_CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.iconName] || Sparkles;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTab(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-md font-sans text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    selectedTab === cat.id
                      ? 'bg-[#f2ca50] text-[#3c2f00] shadow-md'
                      : 'text-[#d0c5af] hover:text-[#e5e2e1] hover:bg-[#353534]/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Main Visual Staging */}
          <div className="lg:col-span-5 h-[350px] lg:h-auto min-h-[350px] rounded-xl overflow-hidden relative group">
            <img 
              src={activeCategory.imageUrl} 
              alt={activeCategory.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-85" />
            <div className="absolute bottom-8 left-8 right-8 space-y-2">
              <span className="inline-block px-2.5 py-1 rounded bg-[#f2ca50]/90 text-[#3c2f00] text-[9.5px] font-sans font-extrabold uppercase tracking-widest leading-none">
                Verified Pro-Staged
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#e5e2e1] tracking-tight">
                {activeCategory.name} Specialists
              </h3>
              <p className="text-[#d0c5af]/80 text-xs font-sans max-w-sm leading-relaxed">
                Extensively trained in premier hospitality traditions of Ahmedabad.
              </p>
            </div>
          </div>

          {/* Subcategories / Packages detail lists */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-[#f2ca50]">
                  <Info className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold font-sans uppercase tracking-widest">About individual vertical</span>
                </div>
                <p className="font-sans text-sm md:text-base text-[#e5e2e1] font-light leading-relaxed">
                  {activeCategory.detailedDescription}
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-[#f2ca50]/80 font-sans font-bold uppercase tracking-widest text-[10px]">
                  Specialty Sub-Services & Tiered Packages
                </span>
                <div className="grid grid-cols-1 gap-3">
                  {activeCategory.subcategories.map((sub) => (
                    <motion.div
                      key={sub.id}
                      onClick={() => onSelectService(activeCategory.id, sub.id)}
                      className="glass-card p-4 rounded-lg flex justify-between items-center group cursor-pointer hover:bg-[#353534]/20 border-l-[3px] border-l-transparent hover:border-l-[#f2ca50]"
                    >
                      <div className="space-y-1 pr-4">
                        <h4 className="font-sans font-bold text-sm text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors">
                          {sub.name}
                        </h4>
                        <p className="font-sans text-xs text-[#d0c5af]/85 leading-relaxed">
                          {sub.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0 flex items-center gap-3">
                        <div className="space-y-0.5">
                          <span className="block text-[9px] text-[#7b7a79] font-sans font-medium uppercase tracking-wider">Estimated Rate</span>
                          <span className="text-[#f2ca50] font-semibold text-xs font-mono">
                            ₹{sub.pricePerDay.toLocaleString('en-IN')}/day
                          </span>
                        </div>
                        <div className="p-1 rounded-full bg-[#353534]/50 group-hover:bg-[#f2ca50] group-hover:text-[#3c2f00] text-[#f2ca50] transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-[#4d4635]/20 mt-6 lg:mt-0">
              <span className="text-xs text-[#7b7a79] font-sans flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#f2ca50]" />
                All personnel carry comprehensive insurance and background guarantees.
              </span>
              <button
                onClick={() => onSelectService(activeCategory.id)}
                className="w-full sm:w-auto text-[#3c2f00] gold-gradient font-sans font-extrabold px-6 py-3 rounded-lg text-xs tracking-wider uppercase hover:shadow-[0_4px_15px_rgba(242,202,80,0.2)] transition-all cursor-pointer text-center"
              >
                Inquire {activeCategory.name}
              </button>
            </div>
          </div>
        </div>

        {/* Staggered Masonry-style Grid as specified in Layout guidelines */}
        <div className="pt-10 border-t border-[#4d4635]/15 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || Sparkles;
            return (
              <motion.div
                key={cat.id}
                onMouseEnter={() => setHoveredCard(cat.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedTab(cat.id)}
                className={`glass-card rounded-xl overflow-hidden cursor-pointer group ${
                  selectedTab === cat.id ? 'ring-1 ring-[#f2ca50]' : ''
                }`}
              >
                <div className="h-60 overflow-hidden relative">
                  <img 
                    src={cat.imageUrl} 
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#131313]/40" />
                  <div className="absolute top-4 left-4 p-2 bg-[#131313]/90 rounded-lg border border-[#4d4635]/30">
                    <Icon className="w-5 h-5 text-[#f2ca50]" />
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[#d0c5af]/90 text-xs font-sans leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="pt-3 border-t border-[#4d4635]/10 flex justify-between items-center">
                    <span className="text-[#f2ca50] text-xs font-semibold font-sans">
                      Start view details
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#f2ca50] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
