import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import CorporateFooter from "@/components/CorporateFooter";
import { getSiteContent } from "@/lib/storage";
import { Scale, ArrowLeft, Mail, Phone, MapPin, Building2, CheckCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones de Uso | NOXA",
  description:
    "Términos y condiciones legales que regulan el acceso, navegación y uso del portal oficial de NOXA (NIT 890900266-3). Legislación de la República de Colombia y Ley 1480 de 2011.",
};

export default function TermsAndConditionsPage() {
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
            <Scale className="w-3.5 h-3.5 text-noxa-sand" />
            <span>Ley 1480 de 2011 — Estatuto del Consumidor</span>
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            Última actualización: Noviembre de 2024 • Portal oficial www.noxa.ink
          </p>
        </header>

        <div className="space-y-10 text-sm font-light leading-relaxed">
          {/* 1. Información General del Titular */}
          <section className="bg-noxa-surface p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              1. Información General del Titular del Sitio Web
            </h2>
            <p>
              En cumplimiento del deber de información comercial y legal de la República de Colombia, se hace constar que el presente sitio web (<strong className="text-white">www.noxa.ink</strong>) es de propiedad y administración exclusiva de:
            </p>
            <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
              <li><strong className="text-white">Nombre Comercial / Razón Social:</strong> NOXA</li>
              <li><strong className="text-white">NIT:</strong> 890900266-3</li>
              <li><strong className="text-white">Matrícula Mercantil:</strong> 812832-16 (Cámara de Comercio de Medellín para Antioquia)</li>
              <li><strong className="text-white">Sede y Notificación Judicial:</strong> CALLE 47 D # 78A - 15, Medellín – Antioquia, Colombia</li>
              <li><strong className="text-white">Correo Oficial de Contacto:</strong> servicioalcliente@noxa.ink</li>
              <li><strong className="text-white">Teléfono de Atención / WhatsApp:</strong> +57 311 374 3447 (3113743447)</li>
            </ul>
          </section>

          {/* 2. Objeto y Alcance del Sitio */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              2. Objeto y Naturaleza del Sitio Web
            </h2>
            <p>
              El portal web <strong className="text-white">www.noxa.ink</strong> tiene por objeto difundir la identidad, manifiesto editorial y catálogo de confección de la marca NOXA, especializada en prendas masculinas de alto gramaje y bóxers ergonómicos para tallas grandes (L hasta 4XL).
            </p>
            <p>
              Este sitio web opera como un canal institucional y de asesoría personalizada previa a la adquisición. La interacción entre el usuario y los asesores se complementa a través de canales directos autorizados (WhatsApp oficial y correo corporativo), garantizando una experiencia de compra personalizada y adaptada a la contextura del cliente.
            </p>
          </section>

          {/* 3. Aceptación de los Términos */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              3. Aceptación de los Términos
            </h2>
            <p>
              El acceso, navegación y uso del portal web, así como la realización del Diagnóstico de Fit interactivo, atribuyen la condición de usuario e implican la aceptación plena e incondicional de todas y cada una de las disposiciones incluidas en estos Términos y Condiciones, así como en nuestra Política de Privacidad.
            </p>
          </section>

          {/* 4. Diagnóstico de Fit y Asesoría */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              4. Herramienta de Diagnóstico de Fit y Medidas
            </h2>
            <p>
              La herramienta interactiva &ldquo;Diagnóstico de Fit NOXA&rdquo; disponible en el sitio web proporciona una sugerencia de talla fundamentada en los parámetros aproximados de peso, estatura, contextura y preferencia de caída ingresados por el usuario.
            </p>
            <p className="text-zinc-400">
              Dicha recomendación tiene carácter orientativo y busca facilitar la selección adecuada de la prenda. Nuestro equipo de asesores confirmará los detalles de medidas exactas en centímetros durante la conversación personalizada por WhatsApp o correo antes del despacho de cualquier pedido.
            </p>
          </section>

          {/* 5. Propiedad Intelectual e Industrial */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              5. Propiedad Intelectual e Industrial
            </h2>
            <p>
              Todos los elementos que integran este sitio web, incluyendo de forma enunciativa pero no limitativa: marcas comerciales, isotipos, logotipos oficiales, fotografías editoriales de campaña, mockups de prendas, textos descriptivos, código fuente, arquitectura de diseño y software, son titularidad exclusiva de <strong className="text-white">NOXA</strong> o de terceros que han autorizado debidamente su uso.
            </p>
            <p className="text-zinc-400">
              Queda estrictamente prohibida la reproducción total o parcial, distribución, comunicación pública, transformación o explotación de cualquiera de estos contenidos sin la autorización previa, expresa y por escrito de NOXA.
            </p>
          </section>

          {/* 6. Garantías y Derecho de Retracto */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              6. Garantía Legal de Calidad y Políticas de Cambio
            </h2>
            <p>
              En cumplimiento del <strong className="text-white">Estatuto del Consumidor (Ley 1480 de 2011)</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li><strong className="text-white">Garantía por defectos de confección:</strong> Todas nuestras prendas cuentan con garantía legal frente a imperfecciones en costuras, cuellos indeformables o defectos de fabricación en el tejido de algodón. La solicitud debe realizarse dentro de los treinta (30) días calendario siguientes a la recepción del producto.</li>
              <li><strong className="text-white">Prendas íntimas (Bóxers):</strong> Por razones estrictas de higiene, salubridad y normatividad sanitaria colombiana, los bóxers ergonómicos no son objeto de cambio por talla si el empaque o sello de protección ha sido abierto o manipulado, salvo en los casos en que exista un defecto comprobado de fabricación.</li>
              <li><strong className="text-white">Cambios de talla en camisetas:</strong> Se admiten cambios de talla en camisetas de alto gramaje siempre que la prenda se encuentre en perfecto estado, con sus etiquetas intactas, sin signos de uso, lavado o perfume, dentro de los quince (15) días calendario siguientes a la entrega.</li>
            </ul>
          </section>

          {/* 7. Responsabilidad del Usuario */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              7. Obligaciones y Conducta del Usuario
            </h2>
            <p>
              El usuario se compromete a hacer un uso diligente, correcto y lícito del sitio web, absteniéndose de realizar cualquier acto que pueda dañar, inutilizar, sobrecargar o deteriorar el portal o impedir su normal utilización por parte de otros usuarios. Asimismo, el usuario garantiza la autenticidad y veracidad de los datos de contacto suministrados en los formularios de consulta.
            </p>
          </section>

          {/* 8. Legislación Aplicable y Jurisdicción */}
          <section className="space-y-3">
            <h2 className="font-headline text-xl uppercase tracking-wide text-white">
              8. Legislación Aplicable y Resolución de Controversias
            </h2>
            <p>
              Los presentes Términos y Condiciones se rigen íntegramente por las leyes de la <strong className="text-white">República de Colombia</strong>. Para cualquier controversia, litigio o reclamación derivada de la interpretación o ejecución de estos términos, las partes se someten a la jurisdicción de los jueces y tribunales competentes de la ciudad de <strong className="text-white">Medellín, Antioquia</strong>, sin perjuicio de los mecanismos directos de concertación previstos en el Estatuto del Consumidor ante la Superintendencia de Industria y Comercio.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
          <span>NOXA • NIT: 890900266-3</span>
          <Link href="/politica-de-privacidad" className="text-noxa-sand hover:underline">
            Ver Política de Privacidad →
          </Link>
        </div>
      </article>

      <CorporateFooter brand={content.brand} />
    </main>
  );
}
