"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin, Lock, FileText, Scale } from "lucide-react";

interface CorporateFooterProps {
  brand?: {
    name: string;
    operator: string;
    nit: string;
    registry: string;
    address: string;
    email: string;
    whatsappFormatted: string;
    whatsappNumber: string;
  };
}

export default function CorporateFooter({ brand }: CorporateFooterProps) {
  const data = brand || {
    name: "NOXA",
    operator: "NOXA",
    nit: "890900266-3",
    registry: "812832-16 (Cámara de Comercio de Medellín para Antioquia)",
    address: "CALLE 47 D # 78A - 15, Medellín – Antioquia, Colombia",
    email: "servicioalcliente@noxa.ink",
    whatsappFormatted: "+57 311 374 3447",
    whatsappNumber: "573113743447",
  };

  return (
    <footer id="quienes-somos" className="bg-[#08080A] border-t border-white/10 pt-20 pb-12 relative text-noxa-concrete">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="relative h-10 w-36 mb-4">
              <Image
                src="/brand/logo.png"
                alt="NOXA Logo Oficial"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Marca registrada y operada por <strong className="text-white font-medium">{data.operator}</strong>. Confección de moda masculina de alto gramaje y ergonomía para tallas grandes, concebida desde la L hasta la 4XL en Medellín, Colombia.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-noxa-sand pt-2 font-mono">
              <ShieldCheck className="w-4 h-4 shrink-0 text-noxa-sand" />
              <span>Cámara de Comercio de Medellín Mat. {data.registry}</span>
            </div>
          </div>

          {/* Col 2: Legal & Corporate Identity */}
          <div>
            <h4 className="font-headline text-lg uppercase tracking-wide text-white mb-4">
              Respaldo Legal & Fiscal
            </h4>
            <div className="space-y-2.5 text-xs font-light">
              <div>
                <span className="text-[10px] uppercase text-zinc-500 block">Razón Social:</span>
                <span className="text-zinc-300 font-medium">{data.operator}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-zinc-500 block">NIT Oficial:</span>
                <span className="text-zinc-300 font-mono">{data.nit}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-zinc-500 block">Dirección Domicilio Principal:</span>
                <span className="text-zinc-300">{data.address}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-zinc-500 block">Portal Web Oficial:</span>
                <span className="text-zinc-300 font-mono">www.noxa.ink</span>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Channels */}
          <div>
            <h4 className="font-headline text-lg uppercase tracking-wide text-white mb-4">
              Atención al Cliente
            </h4>
            <div className="space-y-3 text-xs font-light">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-noxa-sand shrink-0" />
                <a
                  href={`mailto:${data.email}`}
                  className="hover:text-noxa-sand transition-colors text-zinc-300"
                >
                  {data.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-noxa-sand shrink-0" />
                <a
                  href={`https://wa.me/${data.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-noxa-sand transition-colors text-zinc-300 font-mono"
                >
                  {data.whatsappFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-noxa-sand shrink-0" />
                <span className="text-zinc-300">Medellín – Antioquia, Colombia</span>
              </div>
            </div>
          </div>

          {/* Col 4: Legal Links & Policies */}
          <div>
            <h4 className="font-headline text-lg uppercase tracking-wide text-white mb-4">
              Políticas y Legalidad
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <Link
                  href="/terminos-y-condiciones"
                  className="hover:text-noxa-sand transition-colors text-zinc-300 inline-flex items-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5 text-noxa-sand" />
                  <span>Términos y Condiciones</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidad"
                  className="hover:text-noxa-sand transition-colors text-zinc-300 inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-noxa-sand" />
                  <span>Política de Privacidad</span>
                </Link>
              </li>
              <li>
                <a href="#manifiesto" className="hover:text-noxa-sand transition-colors text-zinc-400">
                  Manifiesto de Marca
                </a>
              </li>
              <li>
                <a href="#diagnostico" className="hover:text-noxa-sand transition-colors text-noxa-sand font-medium">
                  Diagnóstico de Fit (L a 4XL)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with discrete /admin link */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-light text-zinc-500 gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              © {new Date().getFullYear()} NOXA (NIT: {data.nit}). Todos los derechos reservados.
            </span>
            <span className="text-zinc-600">•</span>
            <Link href="/terminos-y-condiciones" className="hover:text-zinc-300 transition-colors">
              Términos
            </Link>
            <span className="text-zinc-600">•</span>
            <Link href="/politica-de-privacidad" className="hover:text-zinc-300 transition-colors">
              Privacidad
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-wide text-zinc-600">
              Medellín, Colombia
            </span>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-noxa-sand transition-colors py-1 px-2.5 rounded border border-transparent hover:border-white/10"
              title="Acceso Administrativo"
            >
              <Lock className="w-3 h-3" />
              <span>Acceso Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
