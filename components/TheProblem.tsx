"use client";

import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface TheProblemProps {
  content?: {
    tag: string;
    headline: string;
    description: string;
    comparisons: Array<{ flaw: string; noxaSolution: string }>;
    punchline: string;
  };
}

export default function TheProblem({ content }: TheProblemProps) {
  const data = content || {
    tag: "EMPATÍA & REALIDAD",
    headline: "LO QUE SIEMPRE HAS VIVIDO CON LA ROPA COMÚN",
    description:
      "Si usas tallas grandes, probablemente te has acostumbrado a normalizar la incomodidad. La industria te hizo creer que el problema era tu cuerpo.",
    comparisons: [
      {
        flaw: "Camisetas que se deforman al segundo lavado, cuellos abiertos y telas delgadas que se pegan al abdomen.",
        noxaSolution:
          "Algodón pesado estructurado de 240g que mantiene su caída natural y cuello acanalado reforzado indeformable.",
      },
      {
        flaw: "Bóxers con elásticos que aprietan la cintura, se enrollan en los muslos al caminar y obligan a acomodarse constantemente.",
        noxaSolution:
          "Cintura ergonómica ancha de 45mm que distribuye la presión de forma suave y longitud antiroce que permanece en su lugar.",
      },
      {
        flaw: "Tallas 'Plus Size' hechas simplemente estirando patrones pequeños, creando prendas desproporcionadas y sin forma.",
        noxaSolution:
          "Corte arquitectónico concebido desde cero exclusivamente para torsos masculinos robustos desde la talla L hasta la 4XL.",
      },
    ],
    punchline: "No era tu cuerpo. Era la ropa mal diseñada.",
  };

  return (
    <section id="el-problema" className="py-24 bg-noxa-surface/40 border-y border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-ultra text-noxa-sand uppercase block mb-3">
            {data.tag}
          </span>
          <h2 className="font-headline text-3xl sm:text-5xl uppercase tracking-tight text-white mb-6">
            {data.headline}
          </h2>
          <p className="text-noxa-concrete text-base sm:text-lg font-light leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {data.comparisons.map((item, idx) => (
            <div
              key={idx}
              className="bg-noxa-surface border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/15 transition-all duration-300 group"
            >
              {/* Common Industry Flaw */}
              <div className="mb-6 pb-6 border-b border-white/5">
                <div className="flex items-center gap-2 text-red-400/80 text-xs font-semibold uppercase tracking-wide mb-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>La ropa estándar</span>
                </div>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  "{item.flaw}"
                </p>
              </div>

              {/* NOXA Solution */}
              <div>
                <div className="flex items-center gap-2 text-noxa-sand text-xs font-semibold uppercase tracking-wide mb-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-noxa-sand" />
                  <span>La respuesta NOXA</span>
                </div>
                <p className="text-sm text-noxa-bone font-medium leading-relaxed">
                  {item.noxaSolution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Punchline Statement Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-noxa-surface via-zinc-900 to-noxa-surface border border-noxa-sand/20 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl">
          <div className="text-xs uppercase tracking-ultra text-noxa-sand mb-3">
            Nuestra Convicción Fundamental
          </div>
          <blockquote className="font-headline text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            "{data.punchline}"
          </blockquote>
          <p className="text-noxa-concrete text-sm max-w-xl mx-auto font-light">
            Diseñamos desde la anatomía real hacia afuera. Prendas pensadas para tu cuerpo, no para obligarte a encajar en moldes ajenos.
          </p>
        </div>
      </div>
    </section>
  );
}
