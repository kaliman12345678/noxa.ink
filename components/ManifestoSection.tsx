"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface ManifestoSectionProps {
  manifesto: {
    title: string;
    subtitle: string;
    coreStatement: string;
    points: { title: string; desc: string }[];
  };
}

export default function ManifestoSection({ manifesto }: ManifestoSectionProps) {
  return (
    <section id="manifiesto" className="py-24 px-4 sm:px-6 lg:px-8 bg-noxa-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-semibold tracking-ultra uppercase text-noxa-sand block mb-3">
                {manifesto.subtitle || "MANIFIESTO NOXA // 2024"}
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight uppercase text-noxa-bone leading-none mb-6">
                {manifesto.title || "EL FIT QUE MERECES"}
              </h2>
              <p className="text-base sm:text-lg text-noxa-concrete leading-relaxed font-light">
                {manifesto.coreStatement}
              </p>
            </div>

            {/* Core Values / Points */}
            <div className="space-y-6 pt-4 border-t border-white/5">
              {manifesto.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-noxa-surface border border-white/10 flex items-center justify-center text-noxa-sand flex-shrink-0 font-mono text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold uppercase text-noxa-bone mb-1">
                      {pt.title}
                    </h4>
                    <p className="text-sm text-noxa-concrete leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#diagnostico"
                className="btn-pill-sand text-xs py-3.5 px-8 inline-flex items-center gap-2"
              >
                <span>Descubrir mi talla ideal →</span>
              </a>
            </div>
          </div>

          {/* Right Image/Presentation Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-noxa-surface min-h-[480px]">
              <Image
                src="/brand/noxa-presentacion.jpg"
                alt="NOXA Manifiesto y Presentación Oficial"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noxa-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-noxa-black/80 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-mono tracking-widest uppercase text-noxa-sand block mb-1">
                  FILOSOFÍA DE MARCA
                </span>
                <p className="text-xs text-noxa-bone font-medium italic">
                  &ldquo;Prendas pensadas para tu cuerpo, no para encajar en un molde.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
