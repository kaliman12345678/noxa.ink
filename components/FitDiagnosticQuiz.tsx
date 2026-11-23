"use client";

import React, { useState } from "react";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Shield,
  Ruler,
  Palette,
  HeartHandshake,
} from "lucide-react";
import {
  SizeCategory,
  GarmentPreference,
  FitPreference,
  PalettePreference,
  SizeThresholds,
  WhatsAppTemplates,
} from "@/lib/types";
import { calculateNoxaSize, buildWhatsAppLink } from "@/lib/calculateSize";

interface FitDiagnosticQuizProps {
  whatsappNumber?: string;
  thresholds?: SizeThresholds;
  whatsappTemplates?: WhatsAppTemplates;
  preselectedInterest?: string;
}

export default function FitDiagnosticQuiz({
  whatsappNumber = "573115230622",
  thresholds = {
    lMaxWeight: 88,
    xlMaxWeight: 99,
    xxlMaxWeight: 114,
    xxxlMaxWeight: 130,
  },
  whatsappTemplates = {
    general:
      "Hola NOXA, mi nombre es {nombre} de {ciudad}. Acabo de realizar el Diagnóstico de Fit en su web y mi resultado fue talla {talla} (interés en {prenda}, caída {caida}, paleta {paleta}). Deseo recibir asesoría personalizada sobre disponibilidad y el catálogo oficial. ¡Muchas gracias!",
    boxers:
      "Hola equipo NOXA, soy {nombre} de {ciudad}. Realicé el test de fit enfocado en sus Bóxers Ergonómicos (mido {estatura}cm, peso aprox. {peso}kg y mi talla calculada es {talla}). Quisiera asesoría para confirmar mi talla y conocer los combos en empaque rígido.",
    regalo:
      "Hola NOXA, mi nombre es {nombre} de {ciudad}. Hice el Diagnóstico de Fit para un regalo especial (talla estimada {talla}, interés en {prenda}, preferencia {paleta}). Quisiera que me asesoren para asegurar que el fit sea perfecto y coordinar la entrega en la caja de presentación.",
  },
  preselectedInterest,
}: FitDiagnosticQuizProps) {
  // 5 Steps: 1, 2, 3, 4, 5
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [interest, setInterest] = useState<GarmentPreference>(
    preselectedInterest?.toLowerCase().includes("bóxer")
      ? "Bóxers"
      : preselectedInterest?.toLowerCase().includes("camiseta")
      ? "Camisetas"
      : "Ambos"
  );
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(98);
  const [usualSize, setUsualSize] = useState<string>("2XL");
  const [fitPreference, setFitPreference] = useState<FitPreference>(
    "Estructurada y firme"
  );
  const [palette, setPalette] = useState<PalettePreference>("Negro esencial");

  // Step 5 Contact Form State
  const [fullName, setFullName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [leadSaved, setLeadSaved] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Calculated size based on current inputs
  const calculatedSize: SizeCategory = calculateNoxaSize(
    heightCm,
    weightKg,
    usualSize,
    fitPreference,
    thresholds
  );

  // Generate dynamic WhatsApp URL
  const whatsAppUrl = buildWhatsAppLink({
    phone: whatsappNumber,
    interest,
    name: fullName,
    city: city,
    size: calculatedSize,
    fitPreference,
    palette,
    heightCm,
    weightKg,
    templates: whatsappTemplates,
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!fullName.trim()) {
      setFormError("Por favor ingresa tu nombre.");
      return;
    }
    if (!city.trim()) {
      setFormError("Por favor ingresa tu ciudad.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setFormError("Por favor ingresa un número de WhatsApp válido.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          city,
          whatsapp: phone,
          interest,
          heightCm,
          weightKg,
          usualSize,
          fitPreference,
          palette,
          calculatedSize,
        }),
      });

      if (res.ok) {
        setLeadSaved(true);
      }
    } catch (err) {
      console.error("Error saving lead:", err);
      // Even if network fails, allow opening WhatsApp
    } finally {
      setIsSubmitting(false);
      // Open WhatsApp in new tab
      window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="diagnostico" className="py-24 bg-noxa-bg relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-noxa-sand/30 bg-noxa-surface text-noxa-sand text-[11px] font-semibold tracking-ultra uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Asesoría Consultiva de Fit</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            Diagnóstico de Fit <span className="text-noxa-sand">NOXA</span>
          </h2>
          <p className="text-sm text-noxa-concrete font-light">
            Responde 4 preguntas breves. Nuestro algoritmo calculará tu talla exacta de L a 4XL y preparará tu asesoría personalizada vía WhatsApp sin compromisos de compra.
          </p>
        </div>

        {/* Progress Bar (5 Steps) */}
        <div className="mb-10 bg-noxa-surface/80 border border-white/5 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-noxa-concrete mb-3">
            <span className="uppercase tracking-wider text-noxa-sand font-medium">
              Paso {currentStep} de 5
            </span>
            <span>
              {currentStep === 1 && "Interés Principal"}
              {currentStep === 2 && "Medidas y Complexión"}
              {currentStep === 3 && "Preferencia de Caída"}
              {currentStep === 4 && "Paleta de Color"}
              {currentStep === 5 && "Resultado & Asesoría"}
            </span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <div
              className="bg-noxa-sand h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Quiz Body */}
        <div className="bg-noxa-surface border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative min-h-[420px] flex flex-col justify-between">
          {/* STEP 1: Interés / Dolor */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <span className="text-[10px] font-semibold tracking-ultra text-noxa-sand uppercase block mb-2">
                Paso 1
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
                ¿Qué buscas mejorar hoy en tu vestimenta?
              </h3>
              <p className="text-xs text-noxa-concrete mb-8 font-light">
                Selecciona la prenda donde experimentas mayor inconformidad con las marcas convencionales.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    value: "Camisetas" as GarmentPreference,
                    title: "Camisetas de Alto Gramaje",
                    desc: "Cansado de telas delgadas que marcan el abdomen o cuellos que se abren.",
                  },
                  {
                    value: "Bóxers" as GarmentPreference,
                    title: "Bóxers Ergonómicos",
                    desc: "Buscando bóxers que no aprieten la cintura, no se suban ni se enrollen.",
                  },
                  {
                    value: "Ambos" as GarmentPreference,
                    title: "Ambos (Renovación Total)",
                    desc: "Quiero experimentar la comodidad integral NOXA en prendas superiores e interiores.",
                  },
                  {
                    value: "Regalo" as GarmentPreference,
                    title: "Es para un Regalo Especial",
                    desc: "Busco asesoría para regalar una prenda prémium en empaque rígido de lujo.",
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setInterest(item.value)}
                    className={`p-5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                      interest === item.value
                        ? "border-noxa-sand bg-noxa-sand/10 text-white shadow-lg"
                        : "border-white/5 bg-noxa-bg/60 hover:border-white/20 text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-white">{item.title}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          interest === item.value
                            ? "border-noxa-sand bg-noxa-sand text-noxa-bg"
                            : "border-white/20"
                        }`}
                      >
                        {interest === item.value && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Medidas Anatómicas (Sliders + Quick Size) */}
          {currentStep === 2 && (
            <div className="animate-fade-in space-y-8">
              <div>
                <span className="text-[10px] font-semibold tracking-ultra text-noxa-sand uppercase block mb-2">
                  Paso 2
                </span>
                <h3 className="font-headline text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
                  Tus Medidas y Complexión Real
                </h3>
                <p className="text-xs text-noxa-concrete font-light">
                  Ajusta los controles deslizantes con tus medidas aproximadas para calibrar la proporción de hombro y torso.
                </p>
              </div>

              {/* Slider Estatura */}
              <div className="space-y-3 bg-noxa-bg/60 p-5 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-noxa-bone font-medium flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-noxa-sand" /> Estatura
                  </span>
                  <span className="font-mono text-base font-semibold text-noxa-sand">
                    {heightCm} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="160"
                  max="205"
                  step="1"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-noxa-sand"
                />
                <div className="flex justify-between text-[10px] text-noxa-concrete font-mono">
                  <span>160 cm</span>
                  <span>180 cm</span>
                  <span>205 cm</span>
                </div>
              </div>

              {/* Slider Peso */}
              <div className="space-y-3 bg-noxa-bg/60 p-5 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-noxa-bone font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4 text-noxa-sand" /> Peso aproximado
                  </span>
                  <span className="font-mono text-base font-semibold text-noxa-sand">
                    {weightKg >= 150 ? "150+ kg" : `${weightKg} kg`}
                  </span>
                </div>
                <input
                  type="range"
                  min="75"
                  max="150"
                  step="1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-noxa-sand"
                />
                <div className="flex justify-between text-[10px] text-noxa-concrete font-mono">
                  <span>75 kg</span>
                  <span>110 kg</span>
                  <span>150+ kg</span>
                </div>
              </div>

              {/* Selector Rápido Talla Habitual */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wide text-noxa-concrete block">
                  ¿Qué talla sueles comprar en marcas comunes?
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {["L", "XL", "2XL", "3XL", "4XL", "No estoy seguro"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setUsualSize(sz)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-mono transition-all duration-200 border ${
                        usualSize === sz
                          ? "bg-noxa-sand text-noxa-bg font-bold border-noxa-sand shadow-md"
                          : "bg-noxa-bg/80 text-noxa-bone border-white/10 hover:border-white/20"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Preferencia de Caída */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <span className="text-[10px] font-semibold tracking-ultra text-noxa-sand uppercase block mb-2">
                Paso 3
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
                ¿Cómo prefieres sentir la prenda sobre tu cuerpo?
              </h3>
              <p className="text-xs text-noxa-concrete mb-8 font-light">
                Nuestro patronaje contempla dos sensaciones distintas manteniendo siempre una caída impecable.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    value: "Estructurada y firme" as FitPreference,
                    title: "Estructurada y Firme",
                    subtitle: "Silueta definida y porte arquitectónico",
                    desc: "La prenda enmarca hombros y pecho con caída limpia y recta hacia abajo. Proporciona una presencia elegante y sobria sin apretar.",
                  },
                  {
                    value: "Relajada y fresca" as FitPreference,
                    title: "Relajada y Fresca",
                    subtitle: "Mayor holgura y libertad absoluta",
                    desc: "Corte con espacio extra en torso y abdomen para quienes priorizan el confort máximo y la sensación de cero presión durante el día.",
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFitPreference(item.value)}
                    className={`p-6 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                      fitPreference === item.value
                        ? "border-noxa-sand bg-noxa-sand/10 text-white shadow-xl"
                        : "border-white/5 bg-noxa-bg/60 hover:border-white/20 text-zinc-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-headline text-xl uppercase tracking-wide text-white">
                          {item.title}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            fitPreference === item.value
                              ? "border-noxa-sand bg-noxa-sand text-noxa-bg"
                              : "border-white/20"
                          }`}
                        >
                          {fitPreference === item.value && (
                            <Check className="w-3 h-3 stroke-[3]" />
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-noxa-sand block mb-3 font-medium">
                        {item.subtitle}
                      </span>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Paleta Preferida */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <span className="text-[10px] font-semibold tracking-ultra text-noxa-sand uppercase block mb-2">
                Paso 4
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
                ¿Cuál es tu preferencia de tonalidades?
              </h3>
              <p className="text-xs text-noxa-concrete mb-8 font-light">
                La paleta NOXA está inspirada en tonos minerales y neutros arquitectónicos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  {
                    value: "Negro esencial" as PalettePreference,
                    title: "Negro Esencial",
                    desc: "Atemporal, estilizado y contundente para cualquier ocasión.",
                    swatches: ["#111111", "#18181B"],
                  },
                  {
                    value: "Azul Marino y Gris" as PalettePreference,
                    title: "Azul Marino y Gris",
                    desc: "Tonalidades sobrias de alta versatilidad urbana.",
                    swatches: ["#1B263B", "#6E7275"],
                  },
                  {
                    value: "Surtida" as PalettePreference,
                    title: "Surtida / Mixta",
                    desc: "Combinación de todos los tonos oficiales de la colección.",
                    swatches: ["#111111", "#1B263B", "#6E7275"],
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setPalette(item.value)}
                    className={`p-6 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                      palette === item.value
                        ? "border-noxa-sand bg-noxa-sand/10 text-white shadow-xl"
                        : "border-white/5 bg-noxa-bg/60 hover:border-white/20 text-zinc-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        {item.swatches.map((color, cIdx) => (
                          <span
                            key={cIdx}
                            className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <h4 className="font-headline text-lg uppercase tracking-wide text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wide text-noxa-concrete">
                        {palette === item.value ? "Seleccionada" : "Elegir"}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          palette === item.value
                            ? "border-noxa-sand bg-noxa-sand text-noxa-bg"
                            : "border-white/20"
                        }`}
                      >
                        {palette === item.value && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Pantalla de Resultado & Lead Capture Form */}
          {currentStep === 5 && (
            <div className="animate-fade-in">
              {/* Diagnosis Badge Header */}
              <div className="bg-gradient-to-r from-noxa-surface via-zinc-900 to-noxa-surface border border-noxa-sand/30 rounded-2xl p-6 sm:p-8 mb-8 text-center shadow-xl">
                <span className="text-[10px] font-semibold tracking-ultra text-noxa-sand uppercase block mb-1">
                  Diagnóstico Calculado
                </span>
                <div className="text-xs text-noxa-concrete mb-3">
                  Tu Talla Recomendada en NOXA es:
                </div>
                <div className="font-headline text-5xl sm:text-6xl text-noxa-sand tracking-tight uppercase mb-3">
                  TALLA {calculatedSize}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto font-light leading-relaxed">
                  Para tu contextura ({heightCm} cm, {weightKg} kg) y preferencia de caída{" "}
                  <strong className="text-white font-medium">"{fitPreference}"</strong>, nuestro patrón{" "}
                  <strong className="text-noxa-sand font-mono">{calculatedSize}</strong> garantiza la holgura y caída estructurada ideal.
                </p>
              </div>

              {/* Lead Capture Form */}
              <form onSubmit={handleSubmitLead} className="space-y-4 max-w-xl mx-auto">
                <div className="text-center mb-6">
                  <h4 className="font-headline text-xl uppercase tracking-wide text-white mb-1">
                    Recibe tu Asesoría y Catálogo Oficial
                  </h4>
                  <p className="text-xs text-noxa-concrete font-light">
                    Ingresa tus datos para conectarte directamente con nuestro asesor por WhatsApp y enviarte la disponibilidad exacta en tu talla.
                  </p>
                </div>

                {formError && (
                  <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs text-center">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="text-[11px] uppercase tracking-wide text-noxa-concrete block mb-1.5">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Mendoza"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-noxa-bg/80 border border-white/10 focus:border-noxa-sand rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-noxa-concrete block mb-1.5">
                      Ciudad o Municipio *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Cali, Bogotá, Medellín"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-noxa-bg/80 border border-white/10 focus:border-noxa-sand rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-noxa-concrete block mb-1.5">
                      Número de WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 311 523 0622"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-noxa-bg/80 border border-white/10 focus:border-noxa-sand rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Submit to WhatsApp Button (Plantillas Dinámicas) */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-full bg-noxa-sand hover:bg-noxa-sandHover text-noxa-bg font-semibold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-2xl hover:shadow-noxa-sand/25 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <MessageCircle className="w-5 h-5 fill-noxa-bg" />
                    <span>
                      {isSubmitting
                        ? "Generando asesoría..."
                        : "RECIBIR ASESORÍA Y CATÁLOGO POR WHATSAPP →"}
                    </span>
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-zinc-500 font-light">
                    <HeartHandshake className="w-3.5 h-3.5 text-noxa-sand" />
                    <span>Atención personalizada sin compromiso de compra ni spam</span>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Navigation Controls (Steps 1 to 4) */}
          {currentStep < 5 && (
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/10">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-5 py-2.5 rounded-full border border-white/10 text-xs uppercase tracking-wide text-noxa-concrete hover:text-white disabled:opacity-20 disabled:hover:text-noxa-concrete flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3 rounded-full bg-noxa-sand hover:bg-noxa-sandHover text-noxa-bg text-xs font-semibold uppercase tracking-wide flex items-center gap-2 transition-all shadow-lg hover:shadow-noxa-sand/20"
              >
                <span>{currentStep === 4 ? "Ver Mi Talla →" : "Siguiente"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
