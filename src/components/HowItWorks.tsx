import { useState } from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE_STEPS } from '../data.ts';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section className="py-20 bg-[#131313]/90 relative" id="how-it-works">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#f2ca50]/2 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#f2ca50] font-sans font-bold uppercase tracking-widest text-xs">Seamless Journey</span>
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#e5e2e1] tracking-tight">Experience The Service</h2>
          <p className="text-[#d0c5af] max-w-lg mx-auto text-sm font-light">
            In our world, excellence is not coincidental. It is meticulously designed through a four-phase staging journey.
          </p>
        </div>

        <div className="relative flex flex-col space-y-10">
          {/* Vertical Connective Timeline Line */}
          <div className="absolute left-6 md:left-8 top-3 bottom-3 w-0.5 bg-[#4d4635]/25 overflow-hidden">
            <motion.div 
              className="w-full bg-[#f2ca50]"
              layoutId="timeline-active-fill"
              style={{ height: `${(activeStep / 4) * 100}%` }}
              transition={{ type: 'spring', stiffness: 80 }}
            />
          </div>

          {/* Timeline Steps */}
          {EXPERIENCE_STEPS.map((step) => {
            const isCompleted = step.step < activeStep;
            const isActive = step.step === activeStep;

            return (
              <motion.div 
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-6 md:gap-10 group cursor-pointer relative"
              >
                {/* Glowing Circular Node */}
                <div className="relative shrink-0 z-10 mt-1">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center font-serif text-base md:text-xl font-bold transition-all duration-300 ${
                    isActive 
                      ? 'border-[#f2ca50] bg-[#131313] text-[#f2ca50] shadow-[0_0_15px_rgba(242,202,80,0.3)]' 
                      : isCompleted
                        ? 'border-[#f2ca50]/50 bg-[#f2ca50] text-[#131313]'
                        : 'border-[#4d4635]/30 bg-[#201f1f] text-[#7b7a79]'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" /> : step.step}
                  </div>
                  
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border border-[#f2ca50] scale-125 opacity-30 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Step Body Card content */}
                <div className={`glass-card p-5 md:p-6 rounded-xl flex-grow transition-colors ${
                  isActive ? 'border-[#f2ca50]/40 bg-[#201f1f]/50' : 'hover:bg-[#2a2a2a]/20'
                }`}>
                  <h4 className={`font-serif text-lg md:text-xl mb-2 transition-colors ${
                    isActive ? 'text-[#f2ca50] font-bold' : 'text-[#e5e2e1]'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-[#d0c5af] text-xs md:text-sm font-sans leading-relaxed font-light">
                    {step.description}
                  </p>
                  
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-3 mt-3 border-t border-[#4d4635]/15 flex items-center gap-1 text-[#f2ca50] text-[10px] font-sans font-bold uppercase tracking-wider"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Client Satisfaction Guaranteed Phase
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
