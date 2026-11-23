"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";

import { BrandLegalInfo } from "@/types";

interface HeaderProps {
  brand?: BrandLegalInfo;
  whatsappNumber?: string;
}

export default function Header({ brand, whatsappNumber = "573115230622" }: HeaderProps) {
  const actualWhatsAppNumber = brand?.whatsappNumber || whatsappNumber;
  const defaultMsg = brand?.defaultWhatsAppMessage || "Hola equipo NOXA. Vengo del sitio web y me gustaría recibir asesoría personalizada sobre mi fit.";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Manifiesto", href: "/#manifiesto" },
    { label: "El Problema", href: "/#el-problema" },
    { label: "Estilo de Vida", href: "/#estilo-de-vida" },
    { label: "Nuestras Prendas", href: "/#prendas" },
    { label: "Diagnóstico de Fit", href: "/#diagnostico" },
    { label: "Quiénes Somos", href: "/#quienes-somos" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-noxa-bg/90 backdrop-blur-md border-b border-white/5 py-3 shadow-2xl"
          : "bg-gradient-to-b from-noxa-bg/90 via-noxa-bg/50 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo oficial */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-9 w-28 sm:h-11 sm:w-36 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/brand/logo.png"
                alt="NOXA Logo Oficial"
                fill
                priority
                className="object-contain"
              />
            </div>
            <span className="hidden sm:inline-block text-[10px] tracking-widest text-noxa-concrete uppercase border-l border-white/10 pl-3">
              L a 4XL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-wide text-noxa-concrete hover:text-noxa-sand transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Button (Consultative, NO ecommerce) */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#diagnostico"
              className="px-4 py-2 text-xs uppercase tracking-wide text-noxa-bone hover:text-noxa-sand transition-colors border border-white/10 rounded-full"
            >
              Encontrar Mi Fit
            </a>
            <a
              href={`https://wa.me/${actualWhatsAppNumber}?text=${encodeURIComponent(defaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-noxa-sand hover:bg-noxa-sandHover text-noxa-bg px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 shadow-lg hover:shadow-noxa-sand/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>HABLAR CON UN ASESOR</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-noxa-bone hover:text-noxa-sand transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-noxa-surface border-b border-white/10 px-6 py-6 animate-fade-in shadow-2xl">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wide text-noxa-bone hover:text-noxa-sand transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="#diagnostico"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 border border-white/15 rounded-full text-xs uppercase tracking-wide text-noxa-bone"
              >
                Diagnóstico de Fit (L a 4XL)
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hola%20NOXA%2C%20quisiera%20asesor%C3%ADa%20de%20prendas.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-noxa-sand text-noxa-bg py-3 rounded-full text-xs font-semibold tracking-wide flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>HABLAR CON UN ASESOR WHATSAPP</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
