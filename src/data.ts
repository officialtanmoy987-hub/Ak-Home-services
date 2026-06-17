import { ServiceCategory, Testimonial } from './types.ts';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'maid',
    name: 'House Maid',
    description: 'Professional maintenance for luxury estates, ensuring every corner reflects perfection.',
    detailedDescription: 'Our domestic service experts go beyond simple cleaning. They specialize in maintaining the luster of premium materials—polished marble, high-end wood paneling, fine brass fixtures, and delicate drapery. Trained to operate with absolute discretion and precision, they adapt seamlessly to your household\'s routine.',
    iconName: 'Sparkles',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDBALVlk3voK6R-aiFkxKF0Z7tp3oc3kGScmticVyVC0IcEqHhOAzIn-Hr_r2MYpbRH6g0oYy3Is1UEFVHAReyCn7Jk0ZiyY2KSogZNeywsv48FDOgKacX0LgOkAwnoFv9ftqvrs7Oma9shTR3_jo-JzVH1MMF6SKzhrvDH91Xy-rLnQEJUBHXdfip398or4RwGYQ3hnYkMjWJ1IJ3WSS9ln9A8tQxZQYawDZj98cFL01w5usTeE6Xfm9_WGB38mUd2i44jZJwspY',
    basePrice: 2200,
    subcategories: [
      { id: 'deep-clean', name: 'Deep Estate Cleaning', description: 'Bespoke marble polishing, deep sterilization, glass brilliance, and detail-centric restorative cleaning.', pricePerDay: 3500 },
      { id: 'daily-mgmt', name: 'Daily House Management', description: 'Exacting standards of floor grooming, elegant wardrobe management, laundry care, and light culinary staging.', pricePerDay: 2200 },
      { id: 'organizing', name: 'Luxury Wardrobe & Space Organization', description: 'Color-coded folding, inventory sorting, and neat curation of designer wardrobes/spaces.', pricePerDay: 2800 }
    ]
  },
  {
    id: 'chef',
    name: 'Master Chef',
    description: 'Bespoke culinary experiences delivered in your private kitchen by verified experts.',
    detailedDescription: 'Indulge in unparalleled culinary standards at your own table. Our executive chefs are trained in elite culinary institutions, capable of curating customized multi-course Indian fusion, authentic regional traditional cuisines, and specialized therapeutic diet plans. They manage everything from fresh organic sourcing to ultimate kitchen restoration.',
    iconName: 'ChefHat',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoeam3OZwKEx3rCdJ-hmDdY4zLBUWE1fqAORvjjYrFx49uBDRlu9tyjIK1lGoTsO9JhvZeJYqfBC87oMlQkQlWVKxfw6hW0yN05bpw8sgGr_sWrgablcvyocf6AhjqBB7x-vq5xcZBzp5RU3lDl2ngyNEvFLDL4oO_x_8uDt2TmlCaNQFA6Eev65iCdE9xTfgnLtnKtNUs2ZlclKYqxhmLXzrhzoHWPil2MNPjkQrIbIl2V9Cmr4V_0dL8Mo8sLZw8OJqWKvqJ2so',
    basePrice: 5000,
    subcategories: [
      { id: 'fine-dining', name: 'Fine Dining Celebration', description: 'Exquisite 5-course custom fusion masterpiece served beautifully with artistic plate design.', pricePerDay: 8000 },
      { id: 'daily-gourmet', name: 'Daily High-Nutrition Chef', description: 'A dedicated chef preparing customized nutrient-balanced meals adhering to custom fitness or family requirements.', pricePerDay: 5000 },
      { id: 'banquet', name: 'Private Events & Hors d\'oeuvres', description: 'Intimate social gathers or family high-tea setups, with premium finger foods and luxury presentation.', pricePerDay: 6500 }
    ]
  },
  {
    id: 'eldercare',
    name: 'Elder Care',
    description: 'Dignified, 24/7 compassionate support for your loved ones with medical precision.',
    detailedDescription: 'Our caregivers bring the highest standards of geriatric nursing, physiotherapy assisting, and empathetic companionship. They monitor vitals with medical-grade precision while maintaining a highly engaging, dignified relationship with your parents or elderly family members. Backed by constant concierge medical coordination.',
    iconName: 'HeartHandshake',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnZmrA8-IkXq0DYZblqE-bJfQxwuJxbMfXB2_opndS2woHyLHbzu2Q3ZWueRNK2L1JguZ1Ay7BoWshPuGeG3WFIRTRkIM6geXKDmJOoDIkxSKC2gnUeR20VCCPkyBHlu8tRach-KEWqq66WAFDqxzVuGPGSyVrsUSiB-9I63fBVXrGMnRkadYwDVDx8FFX1ZG2CswuThvNZvb4dYVfeToHAty2a6O1lwKNGgZMDSyEGohh4gNNp-sFpDMcbbTLor9lFXdIIGj2BfM',
    basePrice: 3800,
    subcategories: [
      { id: '24-7-medical', name: '24/7 Medical Care & Support', description: 'Dedicated round-the-clock nurse companion, specialized medicine dosage tracking, and medical coordinate oversight.', pricePerDay: 5500 },
      { id: 'companion', name: 'Dignified Active Companion', description: 'Memory stimulation games, accompanied therapeutic garden walks, high-society lifestyle support, and warm conversation.', pricePerDay: 3800 },
      { id: 'physio-assist', name: 'Physiotherapy & Wellness Support', description: 'A skilled caregiver to supervise home exercises, coordinate mobility routines, and assist with muscle wellness and comfort.', pricePerDay: 4500 }
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Rajesh Singhania',
    role: 'Managing Director, Singhania Estates',
    content: 'The Master Chef service has totally transformed our family weekend dinners. The chef curated a bespoke Gujarati-French fusion menu that left our business partners absolutely spellbound.',
    serviceType: 'chef',
    rating: 5,
    date: '2026-05-12'
  },
  {
    id: 't2',
    author: 'Dr. Amrita Patel',
    role: 'Senior Cardiologist',
    content: 'Entrusting our mother\'s dynamic daily routine to A.K. Home Service\'s elder companion has given us ultimate peace of mind. Exceptional medical precision and heartfelt warmth.',
    serviceType: 'eldercare',
    rating: 5,
    date: '2026-06-01'
  },
  {
    id: 't3',
    author: 'Vikram & Shona Shah',
    role: 'Luxury Villa Owners, Bodakdev',
    content: 'We expected simple dusting, but we received five-star hotel housekeeping for our estate. The marble shines beautifully, and cashmere wardrobe management is completely spectacular.',
    serviceType: 'maid',
    rating: 5,
    date: '2026-06-10'
  }
];

export const EXPERIENCE_STEPS = [
  {
    step: 1,
    title: 'Select Service',
    description: 'Browse our exclusive catalog of residential solutions and select your bespoke requirements.'
  },
  {
    step: 2,
    title: 'Submit Requirements',
    description: 'Provide specific details through our secure portal or connect directly with our concierge.'
  },
  {
    step: 3,
    title: 'Professional Verification',
    description: 'Our rigorous screening process ensures only the most qualified professionals enter your home.'
  },
  {
    step: 4,
    title: 'Delivered Excellence',
    description: 'Enjoy a seamless experience with dedicated ongoing management from our core team.'
  }
];

export const FAQS = [
  {
    q: 'How thoroughly are your service professionals verified?',
    a: 'Every single professional undergoes a rigorous 4-step background check. This includes mandatory verification of police/identity records in Ahmedabad, physical address audits, double reference verification from past upscale estates, and clean wellness checks.'
  },
  {
    q: 'Can I request a custom rotation or transition of professionals?',
    a: 'Absolutely. A.K. Home Service is built around complete bespoke personalization. If you wish to switch service plans, substitute standard schedules for party chefs, or require specialized geriatric aid temporarily, our concierge handles it seamlessly.'
  },
  {
    q: 'What makes your services "luxury" rather than a standard agency?',
    a: 'We train our staff in deluxe hospitality protocols, emphasizing absolute privacy preservation, high-end upholstery/marble care, fine cutlery handling, and silent operation. We don\'t offer generic cleaning; we provide private luxury estate grooming.'
  },
  {
    q: 'Are materials and cleaning products provided by you?',
    a: 'For our Deep Estate Cleaning and standard House Maid services, we supply medical-grade organic sterilizers, non-abrasive custom marble compounds, and microfiber detailers. If you pre-specify state-of-the-art kitchenware preferences for chefs, they execute as directed.'
  }
];
