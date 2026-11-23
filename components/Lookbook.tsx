"use client";

import React from "react";
import Image from "next/image";

interface LookbookItem {
  id: string;
  character: string;
  tag: string;
  tone: string;
  size: string;
  story: string;
  image: string;
}

interface LookbookProps {
  items?: LookbookItem[];
}

export default function Lookbook({ items }: LookbookProps) {
  const defaultItems: LookbookItem[] = [
    {
      id: "char-1",
      character: "El Urbano Seguro",
      tag: "Hero Principal",
      tone: "Negro Esencial — Atemporal, seguro y contundente",
      size: "Talla 3XL",
      story:
        "Hombre robusto con barba cuidada y reloj minimalista. Su camiseta de alto gramaje cae recta y firme sin marcar el abdomen frente al muro de hormigón arquitectónico.",
      image: "/editorial/personaje-1-hero.jpg",
    },
    {
      id: "char-2",
      character: "Estilo de Vida Cotidiano",
      tag: "Lookbook Urbano",
      tone: "Azul Marino Profundo — Equilibrio y sobriedad",
      size: "Talla 2XL",
      story:
        "En un café moderno o terraza de ciudad. Comodidad absoluta sin arrugas ni tela que tire de las costuras mientras trabaja o comparte un café.",
      image: "/editorial/personaje-2-lookbook.jpg",
    },
    {
      id: "char-3",
      character: "Versatilidad y Actitud",
      tag: "Detalle y Movimiento",
      tone: "Gris Acero — Minimalismo y textura",
      size: "Talla 4XL",
      story:
        "Caminando con gafas oscuras en un entorno arquitectónico. Una prenda que acompaña el ritmo de vida urbano con prestancia y solidez.",
      image: "/editorial/personaje-3-actitud.jpg",
    },
  ];

  const list = items || defaultItems;

  return (
    <section id="estilo-de-vida" className="py-24 bg-noxa-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[11px] font-semibold tracking-ultra text-noxa-sand uppercase block mb-3">
              Campaña Editorial & Lookbook
            </span>
            <h2 className="font-headline text-4xl sm:text-6xl uppercase tracking-tight text-white">
              Hombres Reales. <span className="text-noxa-sand">Fit Impecable.</span>
            </h2>
          </div>
          <p className="text-noxa-concrete text-sm max-w-md font-light leading-relaxed">
            Fotografía de moda masculina que refleja comodidad auténtica en tallas XL, 2XL, 3XL y 4XL. Sin poses artificiales; solo presencia y seguridad.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Hero Card (Large, 7 cols) */}
          {list[0] && (
            <div className="lg:col-span-7 bg-noxa-surface border border-white/5 rounded-3xl overflow-hidden group hover:border-noxa-sand/30 transition-all duration-500 flex flex-col justify-between">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={list[0].image}
                  alt={list[0].character}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-noxa-bg/80 backdrop-blur-md text-noxa-sand border border-white/10">
                    {list[0].tag}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10">
                    {list[0].size}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs uppercase tracking-wide text-noxa-concrete mb-1">
                  {list[0].tone}
                </div>
                <h3 className="font-headline text-2xl sm:text-3xl uppercase tracking-tight text-white mb-3">
                  {list[0].character}
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {list[0].story}
                </p>
              </div>
            </div>
          )}

          {/* Secondary Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {list.slice(1, 3).map((item) => (
              <div
                key={item.id}
                className="bg-noxa-surface border border-white/5 rounded-3xl overflow-hidden group hover:border-noxa-sand/30 transition-all duration-500 flex flex-col sm:flex-row lg:flex-col justify-between"
              >
                <div className="relative aspect-[16/10] sm:aspect-square lg:aspect-[16/9] w-full sm:w-1/2 lg:w-full shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.character}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-noxa-bg/80 backdrop-blur-md text-noxa-sand border border-white/10">
                      {item.size}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[11px] uppercase tracking-wide text-noxa-concrete mb-1">
                    {item.tone}
                  </div>
                  <h4 className="font-headline text-xl sm:text-2xl uppercase tracking-tight text-white mb-2">
                    {item.character}
                  </h4>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {item.story}
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
