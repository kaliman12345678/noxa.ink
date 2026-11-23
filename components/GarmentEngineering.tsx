"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Layers } from "lucide-react";

interface Garment {
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
}

interface GarmentEngineeringProps {
  garments?: Garment[];
  onSelectGarment?: (garmentTitle: string) => void;
}

export default function GarmentEngineering({
  garments,
  onSelectGarment,
}: GarmentEngineeringProps) {
  const defaultGarments: Garment[] = [
    {
      id: "camisetas-alto-gramaje",
      title: "Camisetas de Alto Gramaje",
      category: "Prenda Superior",
      badge: "Tallas L a 4XL",
      description:
        "Confeccionadas con algodón prémium de alto gramaje. Brindan una silueta masculina contundente, estructurada y sin arrugas ni adherencias incómodas en el torso.",
      specs: [
        "Cuello acanalado reforzado indeformable (Rib anti-ondas)",
        "Algodón prémium pesado de 240g/m² transpirable",
        "Caída estructurada calibrada para hombros y pecho amplio",
        "Costuras dobles reforzadas de alta durabilidad",
      ],
      sizes: ["L", "XL", "2XL", "3XL", "4XL"],
      colors: ["Negro Mate", "Azul Marino Profundo", "Gris Acero"],
      image: "/editorial/macro-algodon.jpg",
      active: true,
    },
    {
      id: "boxers-ergonomicos",
      title: "Bóxers Ergonómicos",
      category: "Ropa Interior de Alta Gama",
      badge: "Tallas L a 4XL",
      description:
        "Desarrollados con ajuste anatómico que no aprieta ni corta la circulación. No se suben en los muslos ni se enrollan en la pretina durante todo el día.",
      specs: [
        "Pretina ultra suave de elástico ancho antiroce de 45mm",
        "Longitud extendida de pierna calibrada antienrollamiento",
        "Tejido elástico inteligente de microfibra de algodón",
        "Corte ergonómico con soporte natural sin presión",
      ],
      sizes: ["L", "XL", "2XL", "3XL", "4XL"],
      colors: ["Negro Onix", "Azul Noche", "Gris Ceniza"],
      image: "/brand/boxer-mockup-1.png",
      active: true,
    },
    {
      id: "unboxing-experiencial",
      title: "Presentación en Caja Rígida",
      category: "Detalle de Marca",
      badge: "Edición Prémium",
      description:
        "Cada entrega se presenta en nuestra caja rígida negro mate de apertura limpia, pensada para sentirse de alta gama desde el primer contacto.",
      specs: [
        "Estructura rígida de acabado mate suave al tacto",
        "Papel protector interior grabado NOXA",
        "Ideal para obsequio o conservación personal",
        "Empaque 100% reutilizable y sostenible",
      ],
      sizes: ["Formato Estándar"],
      colors: ["Negro Mate Minimalista"],
      image: "/brand/mockup-web.png",
      active: true,
    },
    {
      id: "busos-capsula",
      title: "Próxima Cápsula: Busos y Hoodies",
      category: "Lanzamiento Teaser",
      badge: "Próximamente",
      description:
        "Línea de abrigo en felpa pesada de algodón con capucha arquitectónica y caída recta para climas frescos.",
      specs: [
        "Felpa pesada de 380g de alta retención térmica",
        "Capucha envolvente sin cordones visibles",
        "Bolsillo frontal integrado sin abultar",
        "Corte amplio con caída limpia en tallas L a 4XL",
      ],
      sizes: ["L", "XL", "2XL", "3XL", "4XL"],
      colors: ["Negro Mate", "Gris Grafito"],
      image: "/brand/buso-noxa.png",
      active: true,
    },
  ];

  const list = garments || defaultGarments;

  const handleConsult = (title: string) => {
    if (onSelectGarment) {
      onSelectGarment(title);
    }
    const el = document.getElementById("diagnostico");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="prendas" className="py-24 bg-noxa-surface/30 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-ultra text-noxa-sand uppercase block mb-3">
            Ingeniería Textil & Universo de Piezas
          </span>
          <h2 className="font-headline text-4xl sm:text-6xl uppercase tracking-tight text-white mb-6">
            Prendas Diseñadas <span className="text-noxa-sand">Para Tu Cuerpo</span>
          </h2>
          <p className="text-noxa-concrete text-base font-light leading-relaxed">
            Eliminamos los moldes genéricos. Cada costura, fibra y gramaje está calculado para brindar seguridad, frescura y una caída impecable sin importar tu talla.
          </p>
        </div>

        {/* Bento Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {list
            .filter((g) => g.active)
            .map((garment) => (
              <div
                key={garment.id}
                className="bg-noxa-surface border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-noxa-sand/40 transition-all duration-300 group shadow-xl"
              >
                <div>
                  {/* Badge & Category */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs uppercase tracking-wide text-noxa-concrete">
                      {garment.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-noxa-sand/10 text-noxa-sand border border-noxa-sand/20">
                      {garment.badge}
                    </span>
                  </div>

                  {/* Garment Image Showcase */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-black/40 border border-white/5">
                    <Image
                      src={garment.image}
                      alt={garment.title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-headline text-2xl sm:text-3xl uppercase tracking-tight text-white mb-3">
                    {garment.title}
                  </h3>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                    {garment.description}
                  </p>

                  {/* Specs List */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    {garment.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-start gap-2 text-xs text-noxa-bone font-light"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-noxa-sand mt-1.5 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sizes & Colors Pill Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-[10px] uppercase tracking-wide text-noxa-concrete mr-2">
                      Tallas disponibles:
                    </span>
                    {garment.sizes.map((sz) => (
                      <span
                        key={sz}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono text-white bg-white/5 border border-white/10"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Consultative Action (NO ecommerce cart / NO prices) */}
                <button
                  onClick={() => handleConsult(garment.title)}
                  className="w-full mt-4 py-3.5 px-6 rounded-full border border-noxa-sand/40 hover:border-noxa-sand bg-noxa-sand/5 hover:bg-noxa-sand text-noxa-sand hover:text-noxa-bg text-xs font-semibold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Quiero asesoría sobre esta prenda</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            ))}
        </div>

        {/* Textile Engineering Macro Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/10">
          <div className="bg-noxa-surface/60 border border-white/5 rounded-2xl p-6">
            <div className="text-xs uppercase tracking-ultra text-noxa-sand mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-noxa-sand" />
              Ingeniería de Algodón
            </div>
            <h4 className="font-headline text-xl uppercase text-white mb-2">
              Gramaje de 240g/m²
            </h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Tejido compacto y pesado que da estructura sin sobrecalentar el cuerpo. Oculta relieves y otorga porte impecable.
            </p>
          </div>

          <div className="bg-noxa-surface/60 border border-white/5 rounded-2xl p-6">
            <div className="text-xs uppercase tracking-ultra text-noxa-sand mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-noxa-sand" />
              Cuello Indeformable
            </div>
            <h4 className="font-headline text-xl uppercase text-white mb-2">
              Rib Acanalado Anti-Ondas
            </h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              El rib de doble hilatura resiste ciclos repetidos de lavado en lavadora sin ensancharse ni perder la circunferencia perfecta.
            </p>
          </div>

          <div className="bg-noxa-surface/60 border border-white/5 rounded-2xl p-6">
            <div className="text-xs uppercase tracking-ultra text-noxa-sand mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-noxa-sand" />
              Pretina Anatómica
            </div>
            <h4 className="font-headline text-xl uppercase text-white mb-2">
              45mm Antiroce y Cero Roll
            </h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              El elástico ultra ancho distribuye el soporte sobre el contorno abdominal para que no te corte la piel ni se enrolle hacia abajo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
