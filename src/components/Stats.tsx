import { motion } from 'motion/react';
import { Award, Users, ShieldCheck, Star } from 'lucide-react';

export default function Stats() {
  const statList = [
    { value: '5000+', label: 'Families Served', icon: Users },
    { value: '100%', label: 'Verified Pros', icon: ShieldCheck },
    { value: '24/7', label: 'Elite Support', icon: Award },
    { value: '4.9', label: 'Rating Score', icon: Star },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10" id="stats">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 glass-card p-8 md:p-10 rounded-xl">
        {statList.map((stat, i) => {
          const IconComponent = stat.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center space-y-2 md:border-r border-[#4d4635]/30 last:border-r-0 flex flex-col items-center justify-center animate-fade-in"
            >
              <IconComponent className="w-5 h-5 text-[#f2ca50]/70 mb-1" />
              <div className="text-[#f2ca50] font-serif text-3xl md:text-4xl font-extrabold gold-glow">
                {stat.value}
              </div>
              <div className="text-[#d0c5af] font-sans font-bold uppercase tracking-widest text-[10px] md:text-xs">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
