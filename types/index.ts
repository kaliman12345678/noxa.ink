export interface BrandLegalInfo {
  name: string;
  companyName: string;
  nit: string;
  matricula: string;
  chamberOfCommerce: string;
  establishedYear: string;
  address: string;
  city: string;
  email: string;
  phoneDisplay: string;
  whatsappNumber: string;
  defaultWhatsAppMessage: string;
  instagramUrl: string;
  tiktokUrl: string;
}

export interface GarmentItem {
  id: string;
  title: string;
  tagline: string;
  category: "camisetas" | "boxers" | "unboxing" | "capsulas";
  badge: string;
  description: string;
  technicalSpecs: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  image: string;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  size: string;
  quote: string;
  garment: string;
}

export interface CharacterFeature {
  id: string;
  characterTitle: string;
  subtitle: string;
  sizeTag: string;
  garmentColor: string;
  attitude: string;
  image: string;
  quote: string;
}

export interface SiteContent {
  brand: BrandLegalInfo;
  hero: {
    badge: string;
    h1FirstPart: string;
    h1AccentPart: string;
    subtitle: string;
    ctaQuiz: string;
    ctaManifesto: string;
    heroImage: string;
    backgroundVideoUrl?: string;
  };
  manifesto: {
    title: string;
    subtitle: string;
    coreStatement: string;
    points: { title: string; desc: string }[];
  };
  problemSection: {
    tag: string;
    title: string;
    subtitle: string;
    painPoints: {
      title: string;
      description: string;
      icon: string;
    }[];
    punchline: string;
  };
  characters: CharacterFeature[];
  garments: GarmentItem[];
  testimonials: Testimonial[];
  fitDiagnostic: {
    title: string;
    subtitle: string;
    disclaimer: string;
  };
}

export interface LeadRecord {
  id: string;
  createdAt: string;
  fullName: string;
  city: string;
  phone: string;
  preference: string;
  currentSize: string;
  fitStyle: string;
  heightCm?: number;
  weightKg?: number;
  recommendedSize: string;
  status: "nuevo" | "contactado" | "asesorado" | "cerrado";
  notes?: string;
}
