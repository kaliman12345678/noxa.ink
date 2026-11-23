import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import CorporateFooter from "@/components/CorporateFooter";
import { getSiteContent } from "@/lib/storage";
import { ShieldCheck, ArrowLeft, Mail, Phone, MapPin, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad y Tratamiento de Datos | NOXA",
  description:
    "Política de tratamiento de datos personales y privacidad de NOXA (NIT 890900266-3). Cumplimiento de la Ley 1581 de 2012 y Decreto 1377 de 2013 de la República de Colombia.",
};

export default function PrivacyPolicyPage() {
  const content = getSiteContent();

  return (
    <main className="min-h-screen bg-noxa-bg text-noxa-bone selection:bg-noxa-sand selection:text-noxa-bg flex flex-col justify-between">
      <Header whatsappNumber={content.brand.whatsappNumber} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-zinc-300">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-noxa-sand hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>

        <header className="border-b border-white/10 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-noxa-surface border border-white/10 text-[10px] font-mono uppercase tracking-widest text-noxa-sand mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-noxa-sand" />
            <span>Ley 1581 de 2012 — República de Colombia</span>
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            Política de Privacidad y Tratamiento de Datos Personales
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            Última actualización: Noviembre de 2024 • Vigente para el dominio oficial www.noxa.ink
          </p>
        </header>

        <div className="space-y-10 text-sm font-light leading-relaxed">
          {/* 1. Responsable del tratamiento */}
          <section className="bg-noxa-surface p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              1. Identificación del Responsable del Tratamiento
            </h2>
            <p>
              El responsable del tratamiento de sus datos personales recopilados a través del sitio web{" "}
              <strong className="text-white">www.noxa.ink</strong> y sus canales autorizados de atención es:
            </p>
            <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
              <li><strong className="text-white">Razón Social:</strong> NOXA</li>
              <li><strong className="text-white">NIT:</strong> 890900266-3</li>
              <li><strong className="text-white">Matrícula Mercantil:</strong> 812832-16 (Cámara de Comercio de Medellín para Antioquia)</li>
              <li><strong className="text-white">Domicilio Principal:</strong> Medellín, Antioquia, Colombia</li>
              <li><strong className="text-white">Dirección Física:</strong> CALLE 47 D # 78A - 15, Medellín - Antioquia</li>
              <li><strong className="text-white">Correo Electrónico de Contacto:</strong> servicioalcliente@noxa.ink</li>
              <li><strong className="text-white">Línea Telefónica / WhatsApp:</strong> +57 311 374 3447 (3113743447)</li>
            </ul>
          </section>

          {/* 2. Marco Legal */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              2. Marco Normativo
            </h2>
            <p>
              La presente Política de Privacidad se rige bajo los principios de legalidad, finalidad, libertad, veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad, establecidos en el artículo 15 de la Constitución Política de Colombia, la <strong className="text-white">Ley Estatutaria 1581 de 2012</strong>, el <strong className="text-white">Decreto Reglamentario 1377 de 2013</strong> y demás normas concordantes expedidas por la Superintendencia de Industria y Comercio (SIC).
            </p>
          </section>

          {/* 3. Datos recopilados */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              3. Datos Personales Recopilados
            </h2>
            <p>
              NOXA podrá solicitar, almacenar y procesar datos personales a través del formulario interactivo de Diagnóstico de Fit, canales de mensajería (WhatsApp) y suscripciones a catálogo:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>Datos de identificación y contacto: Nombre completo, número de teléfono móvil / WhatsApp, ciudad y correo electrónico.</li>
              <li>Datos de preferencias y medidas corporales: Estatura aproximada, peso referencial, talla habitual (L a 4XL), tipo de prenda de interés (camisetas, bóxers) y preferencia de ajuste (estructurado o relajado).</li>
              <li>Datos de navegación técnica: Dirección IP anonimizada, tipo de dispositivo, navegador y métricas de uso recopiladas mediante cookies estrictamente analíticas.</li>
            </ul>
            <p className="text-xs text-zinc-400 italic">
              NOXA no recopila ni almacena datos de tarjetas de crédito o credenciales financieras en este sitio web, al no operar pasarelas de pago ni cobros automáticos directos.
            </p>
          </section>

          {/* 4. Finalidades del tratamiento */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              4. Finalidades del Tratamiento de Datos
            </h2>
            <p>
              Los datos personales recolectados por NOXA serán utilizados exclusivamente para los siguientes propósitos:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-zinc-400">
              <li>Calcular y remitir la recomendación personalizada de talla y silueta resultante del Diagnóstico de Fit.</li>
              <li>Entablar comunicación directa y personalizada vía WhatsApp (+57 311 374 3447) o correo electrónico para asesoría técnica de confección y atención al cliente.</li>
              <li>Compartir el catálogo oficial de productos, guías de cuidado de prendas y disponibilidad de colecciones bajo solicitud expresa del titular.</li>
              <li>Gestionar solicitudes, peticiones, quejas o reclamos (PQR) relacionados con la experiencia de marca.</li>
              <li>Cumplir con las obligaciones legales, tributarias y comerciales vigentes ante las autoridades de la República de Colombia.</li>
            </ol>
          </section>

          {/* 5. Derechos de los titulares */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              5. Derechos de los Titulares (Habeas Data)
            </h2>
            <p>
              De conformidad con el artículo 8 de la Ley 1581 de 2012, como titular de los datos personales usted tiene derecho a:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li><strong className="text-white">Conocer, actualizar y rectificar</strong> sus datos personales frente a NOXA en cualquier momento.</li>
              <li><strong className="text-white">Solicitar prueba</strong> de la autorización otorgada para el tratamiento de sus datos.</li>
              <li><strong className="text-white">Ser informado</strong> previa solicitud respecto del uso que se le ha dado a sus datos.</li>
              <li><strong className="text-white">Revocar la autorización</strong> y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.</li>
              <li><strong className="text-white">Acceder de forma gratuita</strong> a sus datos personales que hayan sido objeto de tratamiento.</li>
            </ul>
          </section>

          {/* 6. Procedimiento para ejercer derechos */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              6. Canales y Procedimiento para Consultas y Reclamos
            </h2>
            <p>
              Para ejercer cualquiera de sus derechos de Habeas Data (conocer, actualizar, rectificar o solicitar la eliminación de sus datos), puede enviar una comunicación formal a nuestros canales directos:
            </p>
            <div className="bg-noxa-surface p-5 rounded-xl border border-white/5 space-y-2 text-xs">
              <p>• <strong className="text-white">Correo electrónico:</strong> <a href="mailto:servicioalcliente@noxa.ink" className="text-noxa-sand underline">servicioalcliente@noxa.ink</a></p>
              <p>• <strong className="text-white">Dirección física:</strong> CALLE 47 D # 78A - 15, Medellín - Antioquia, Colombia</p>
              <p>• <strong className="text-white">Línea de atención:</strong> +57 311 374 3447</p>
            </div>
            <p className="text-xs text-zinc-400">
              Su solicitud será atendida en un plazo máximo de diez (10) días hábiles contados a partir de la fecha de recibo. Si no fuere posible resolverla en dicho término, se le informará antes del vencimiento expresando los motivos de la demora y señalando la fecha en que se resolverá.
            </p>
          </section>

          {/* 7. Seguridad de la información */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              7. Medidas de Seguridad y Confidencialidad
            </h2>
            <p>
              NOXA implementa medidas técnicas, humanas y administrativas necesarias para salvaguardar la confidencialidad, integridad y disponibilidad de la información de sus usuarios, evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.
            </p>
          </section>

          {/* 8. Vigencia */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              8. Vigencia de la Política
            </h2>
            <p>
              La presente política entra en vigencia a partir de su publicación en el portal web www.noxa.ink y permanecerá vigente mientras NOXA desarrolle su objeto social comercial en el territorio colombiano.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
          <span>NOXA • NIT: 890900266-3</span>
          <Link href="/terminos-y-condiciones" className="text-noxa-sand hover:underline">
            Ver Términos y Condiciones →
          </Link>
        </div>
      </article>

      <CorporateFooter brand={content.brand} />
    </main>
  );
}
