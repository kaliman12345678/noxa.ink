export type SizeCategory = "L" | "XL" | "2XL" | "3XL" | "4XL";

export type GarmentPreference = "Camisetas" | "Bóxers" | "Ambos" | "Regalo";

export type FitPreference = "Estructurada y firme" | "Relajada y fresca";

export type PalettePreference = "Negro esencial" | "Azul Marino y Gris" | "Surtida";

export interface Lead {
  id: string;
  createdAt: string;
  fullName: string;
  city: string;
  whatsapp: string;
  interest: GarmentPreference;
  heightCm: number;
  weightKg: number;
  usualSize: string;
  fitPreference: FitPreference;
  palette: PalettePreference;
  calculatedSize: SizeCategory;
  notes?: string;
  status: "nuevo" | "contactado" | "asesorado" | "completado";
}

export interface SizeThresholds {
  lMaxWeight: number; // e.g. 88
  xlMaxWeight: number; // e.g. 98
  xxlMaxWeight: number; // e.g. 112
  xxxlMaxWeight: number; // e.g. 128
  // above xxxlMaxWeight -> 4XL
}

export interface WhatsAppTemplates {
  general: string;
  boxers: string;
  regalo: string;
}

export interface SiteContent {
  brand: {
    name: string;
    operator: string;
    nit: string;
    registry: string;
    address: string;
    email: string;
    whatsappNumber: string;
    whatsappFormatted: string;
    instagram: string;
    tiktok: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    videoUrl?: string;
  };
  manifesto: {
    tag: string;
    headline: string;
    statement: string;
    keyPoints: Array<{ title: string; desc: string }>;
  };
  theProblem: {
    tag: string;
    headline: string;
    description: string;
    comparisons: Array<{
      flaw: string;
      noxaSolution: string;
    }>;
    punchline: string;
  };
  garments: Array<{
    id: string;
    title: string;
    category: string;
    badge: string;
    description: string;
    specs: string[];
    sizes: string[];
    colors: string[];
    image: string;
    active: boolean;
  }>;
  lookbook: Array<{
    id: string;
    character: string;
    tag: string;
    tone: string;
    size: string;
    story: string;
    image: string;
  }>;
  textileEngineering: Array<{
    title: string;
    subtitle: string;
    details: string;
    image: string;
  }>;
  testimonials: Array<{
    id: string;
    quote: string;
    author: string;
    city: string;
    size: string;
  }>;
  quizConfig: {
    thresholds: SizeThresholds;
    whatsappTemplates: WhatsAppTemplates;
  };
}
