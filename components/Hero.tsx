"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface HeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  videoUrl?: string;
}

export default function Hero({
  badge = "TALLAS REALES DESDE LA L HASTA LA 4XL",
  title = "LA TALLA CAMBIA, LA ACTITUD NO.",
  subtitle = "En NOXA creamos prendas diseñadas para personas que buscan comodidad de verdad. Sin apretar, sin perder la forma, sin tener que encajar en un molde.",
  ctaPrimary = "DESCUBRE TU FIT IDEAL",
  ctaSecondary = "VER EL MANIFIESTO",
  videoUrl = "",
}: HeroProps) {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-noxa-bg">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-35"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src="/editorial/personaje-1-hero.jpg"
              alt="Campaña NOXA - Personaje 1"
              fill
              priority
              className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            />
          </div>
        )}

        {/* Cinematic Vignette and Dark Matte Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-noxa-bg via-noxa-bg/75 to-noxa-bg/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-noxa-bg/60 to-noxa-bg" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Tag Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-noxa-sand/30 bg-noxa-surface/80 backdrop-blur-md text-noxa-sand text-[11px] sm:text-xs font-medium tracking-ultra uppercase mb-8 animate-fade-in shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-noxa-sand" />
          <span>{badge}</span>
        </div>

        {/* Main Editorial Headline */}
        <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95] max-w-4xl mx-auto mb-6">
          LA TALLA CAMBIA,{" "}
          <span className="text-noxa-sand drop-shadow-sm">LA ACTITUD NO.</span>
        </h1>

        {/* Narrative Subtitle */}
        <p className="text-base sm:text-xl text-noxa-concrete max-w-2xl mx-auto font-light leading-relaxed mb-10">
          {subtitle}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#diagnostico"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-noxa-sand hover:bg-noxa-sandHover text-noxa-bg px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-xl hover:shadow-noxa-sand/25 group"
          >
            <span>{ctaPrimary}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#manifiesto"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-wide text-noxa-bone hover:text-white border border-white/15 hover:border-noxa-sand/50 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-200"
          >
            {ctaSecondary}
          </a>
        </div>

        {/* Trust & Engineering Pillars (NO ecommerce icons) */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left w-full max-w-4xl">
          <div className="space-y-1">
            <div className="text-[10px] tracking-ultra text-noxa-concrete uppercase">Gramaje Textil</div>
            <div className="text-sm font-medium text-white">Algodón 240g/m²</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] tracking-ultra text-noxa-concrete uppercase">Cuello Reforzado</div>
            <div className="text-sm font-medium text-white">Rib Anti-Ondas</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] tracking-ultra text-noxa-concrete uppercase">Bóxers Ergonómicos</div>
            <div className="text-sm font-medium text-white">Cero Enrollamiento</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] tracking-ultra text-noxa-concrete uppercase">Respaldo Real</div>
            <div className="text-sm font-medium text-white flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-noxa-sand" />
              GTD Colombia SAS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
