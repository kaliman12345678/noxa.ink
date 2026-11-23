"use client";

import React from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  city: string;
  size: string;
}

interface CommunityVoicesProps {
  testimonials?: Testimonial[];
}

export default function CommunityVoices({ testimonials }: CommunityVoicesProps) {
  const defaultTestimonials: Testimonial[] = [
    {
      id: "t-1",
      quote:
        "Por primera vez encuentro una camiseta que me queda bien en los hombros sin parecer una carpa en la cintura. La tela tiene un peso y presencia increíble, y el cuello sigue intacto tras varias semanas de uso.",
      author: "Carlos R.",
      city: "Bogotá D.C.",
      size: "Talla 3XL",
    },
    {
      id: "t-2",
      quote:
        "Los bóxers cambiaron por completo mi día a día. Por mi trabajo camino constantemente y no se suben ni una sola vez en los muslos. Tampoco se enrollan en la cintura como los de otras marcas.",
      author: "Andrés M.",
      city: "Medellín",
      size: "Talla 2XL",
    },
    {
      id: "t-3",
      quote:
        "La experiencia de recibir la caja negra rígida y tocar la textura del algodón te demuestra que esto es otra categoría. Se siente de verdad como un producto de alta gama hecho con respeto hacia nuestra contextura.",
      author: "Felipe S.",
      city: "Cali",
      size: "Talla 4XL",
    },
  ];

  const list = testimonials || defaultTestimonials;

  return (
    <section className="py-24 bg-noxa-surface/20 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-ultra text-noxa-sand uppercase block mb-3">
            Comunidad & Voces Reales
          </span>
          <h2 className="font-headline text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            Cómo Se Siente <span className="text-noxa-sand">Usar NOXA</span>
          </h2>
          <p className="text-sm text-noxa-concrete font-light">
            Experiencias de hombres que dejaron de conformarse con ropa incómoda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item) => (
            <div
              key={item.id}
              className="bg-noxa-surface border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-white/15 transition-all duration-300 shadow-xl"
            >
              <div>
                <Quote className="w-8 h-8 text-noxa-sand/30 mb-6" />
                <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-headline text-lg uppercase text-white tracking-wide">
                    {item.author}
                  </div>
                  <div className="text-xs text-noxa-concrete">{item.city}</div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono text-noxa-sand bg-noxa-sand/10 border border-noxa-sand/20">
                  {item.size}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
