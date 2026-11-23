import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TheProblem from "@/components/TheProblem";
import Manifesto from "@/components/Manifesto";
import Lookbook from "@/components/Lookbook";
import GarmentEngineering from "@/components/GarmentEngineering";
import FitDiagnosticQuiz from "@/components/FitDiagnosticQuiz";
import CommunityVoices from "@/components/CommunityVoices";
import CorporateFooter from "@/components/CorporateFooter";
import { getSiteContent } from "@/lib/storage";

// Server-rendered page reading latest content from storage
export default function HomePage() {
  const content = getSiteContent();

  return (
    <main className="min-h-screen bg-noxa-bg text-noxa-bone selection:bg-noxa-sand selection:text-noxa-bg">
      {/* Sticky Header with Official NOXA Logo */}
      <Header whatsappNumber={content.brand.whatsappNumber} />

      {/* Hero Inmersivo con Personaje 1 y Tallas L a 4XL */}
      <Hero
        badge={content.hero.badge}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        ctaPrimary={content.hero.ctaPrimary}
        ctaSecondary={content.hero.ctaSecondary}
        videoUrl={content.hero.videoUrl}
      />

      {/* Sección "El Problema Real" (Empatía con cuellos, telas y bóxers) */}
      <TheProblem content={content.theProblem} />

      {/* Manifiesto y Filosofía NOXA */}
      <Manifesto content={content.manifesto} />

      {/* Lookbook Estilo de Vida: 3 Personajes Reales */}
      <Lookbook items={content.lookbook} />

      {/* Universo de Prendas & Ingeniería Textil (100% SIN PRECIOS) */}
      <GarmentEngineering garments={content.garments} />

      {/* Diagnóstico de Fit NOXA (Flujo de 5 Pasos Exactos + WhatsApp) */}
      <FitDiagnosticQuiz
        whatsappNumber={content.brand?.whatsappNumber || "573115230622"}
        thresholds={content.quizConfig?.thresholds}
        whatsappTemplates={content.quizConfig?.whatsappTemplates}
      />

      {/* Testimonios y Voces de la Comunidad */}
      <CommunityVoices testimonials={content.testimonials} />

      {/* Footer Oficial & Respaldo GTD COLOMBIA SAS */}
      <CorporateFooter brand={content.brand} />
    </main>
  );
}
