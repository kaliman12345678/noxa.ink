"use client";

import React from "react";
import { Check, ShieldCheck, Sparkles } from "lucide-react";

interface ManifestoProps {
  content?: {
    tag: string;
    headline: string;
    statement: string;
    keyPoints: Array<{ title: string; desc: string }>;
  };
}

export default function Manifesto({ content }: ManifestoProps) {
  const data = content || {
    tag: "FILOSOFÍA NOXA",
    headline: "ROPA CONSTRUIDA PARA TU CUERPO, NO PARA UN MOLDE ESTÁNDAR",
    statement:
      "Durante años, el mercado tradicional ha intentado forzar a los hombres de contextura grande a vestirse con patrones escalados de manera defectuosa: cuellos que se abren, telas que se adhieren donde no deben y costuras que lastiman. En NOXA rompemos ese paradigma con ingeniería textil pensada desde el origen.",
    keyPoints: [
      {
        title: "Patronaje Anatómico de Cero",
        desc: "No alargamos una talla M; rediseñamos los hombros, el ancho de pecho y la caída lateral desde la talla L hasta la 4XL.",
      },
      {
        title: "Algodón de Alto Gramaje",
        desc: "Tejidos pesados y densos que otorgan una caída limpia y estructurada, ocultando transparencias e imperfecciones.",
      },
      {
        title: "Cuellos Indeformables",
        desc: "Rib reforzado con hilatura de alta resistencia que mantiene su silueta firme incluso después de múltiples lavados.",
      },
      {
        title: "Bóxers Antiroce y Cero Enrollamiento",
        desc: "Pretina anatómica ancha y longitud de pierna calibrada para que camines con total libertad sin que la prenda se suba.",
      },
    ],
  };

  return (
    <section id="manifiesto" className="py-24 bg-noxa-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Big Brand Manifesto Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-noxa-sand/20 bg-noxa-surface text-noxa-sand text-[11px] font-semibold tracking-ultra uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{data.tag}</span>
            </div>

            <h2 className="font-headline text-3xl sm:text-5xl uppercase tracking-tight text-white leading-[1.05]">
              {data.headline}
            </h2>

            <div className="w-16 h-1 bg-noxa-sand rounded-full" />

            <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
              {data.statement}
            </p>

            {/* Official Brand Quotes */}
            <div className="pt-4 space-y-3 border-t border-white/10">
              <div className="text-xs uppercase tracking-wide text-noxa-sand font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-noxa-sand" />
                "La talla cambia, la actitud no."
              </div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-light flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                "El fit que mereces."
              </div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-light flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                "Comodidad. Calidad. Actitud."
              </div>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.keyPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-noxa-surface border border-white/5 rounded-2xl p-6 hover:border-noxa-sand/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-noxa-sand/10 border border-noxa-sand/20 flex items-center justify-center mb-4 text-noxa-sand">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="font-headline text-lg sm:text-xl uppercase tracking-wide text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
