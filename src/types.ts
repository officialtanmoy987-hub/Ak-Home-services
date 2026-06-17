export type ServiceType = 'maid' | 'chef' | 'eldercare';

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  pricePerDay: number; // in INR
}

export interface ServiceCategory {
  id: ServiceType;
  name: string;
  description: string;
  detailedDescription: string;
  iconName: string; // lucide icon identifier
  imageUrl: string;
  basePrice: number; // in INR per day
  subcategories: SubCategory[];
}

export type ExpertiseLevel = 'standard' | 'elite' | 'royal';

export interface Booking {
  id: string;
  serviceType: ServiceType;
  subcategory: string;
  date: string;
  time: string;
  durationDays: number;
  expertiseLevel: ExpertiseLevel;
  specialRequirements: string;
  customerName: string;
  customerPhone: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  costEstimate: number;
  createdAt: string;
  rating?: number;
  reviewText?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  serviceType: ServiceType;
  rating: number;
  date: string;
}
