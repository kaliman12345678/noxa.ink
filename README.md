# NOXA — Plataforma Oficial

> **Embudo de Identidad de Marca y Estilo de Vida (Brand Funnel)** para hombres de contextura grande y robusta (**Tallas L a 4XL**).
> Confección en algodón de alto gramaje y bóxers ergonómicos bajo la estética *Quiet Luxury* y Minimalismo Arquitectónico.

---

## 🏛️ Información Corporativa y Legal Oficial
- **Razón Social:** NOXA
- **NIT Oficial:** 890900266-3
- **Inscripción / Matrícula Mercantil:** 812832-16 (Cámara de Comercio de Medellín para Antioquia)
- **Domicilio Principal:** CALLE 47 D # 78A - 15, Medellín – Antioquia, Colombia
- **Correo Oficial de Atención:** `servicioalcliente@noxa.ink`
- **Línea de Atención / WhatsApp:** `+57 311 374 3447`
- **Portal Web Oficial:** `www.noxa.ink`

---

## ⚠️ Regla Fundamental del Proyecto
- **NO ES UNA TIENDA ONLINE NI PLATAFORMA DE VENTA DIRECTA.**
- **0% Precios, 0% Signos de moneda ($), 0% Carritos de compra, 0% Descuentos numéricos.**
- El objetivo es generar conexión con la identidad de marca, diagnosticar el fit anatómico del usuario en 4 pasos y canalizarlo a una **asesoría de fit personalizada vía WhatsApp (+57 311 374 3447)**.

---

## 🚀 Inicio Rápido en Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

3. **Compilar para producción:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🔐 Panel de Control Administrativo (`/admin`)

- **Ruta de acceso:** [http://localhost:3000/admin](http://localhost:3000/admin) (o `/admin/login`)
- **Credenciales por defecto:**
  - 📧 **Correo:** `servicioalcliente@noxa.ink` (o `talento@noxa.lat`)
  - 🔑 **Contraseña:** `noxa2024!`

### Módulos del Panel:
1. **Bandeja de Leads (CRM):** Visualiza en tiempo real los registros completados en el Diagnóstico de Fit, con estado de gestión, botón de **Chat en WhatsApp 1-Clic** y botón de **Exportar a CSV**.
2. **Embudo & WhatsApp:** Edita el número de WhatsApp receptor, los umbrales de peso para el cálculo de tallas y las plantillas dinámicas de mensajes.
3. **Textos & Manifiesto:** Edita el Hero, frases de marca, secciones de empatía y respaldo corporativo sin tocar código.
4. **Líneas de Prendas:** Conmutador para activar/desactivar prendas y editar especificaciones textiles (siempre sin precios).
5. **Galería & Medios:** Selector y visualizador de recursos de marca y lookbook.

---

## 📦 Despliegue en Producción (Vercel + Supabase)

1. **Subir a GitHub / Repositorio Git:** Ya conectado a `kaliman12345678/noxa.ink`.
2. **Importar en Vercel:** Detectará automáticamente el proyecto Next.js.
3. **Configurar Dominio Propio en Vercel:**
   - En **Settings → Domains** de Vercel agrega: `noxa.ink` y `www.noxa.ink`.
   - Apunta tu DNS con un registro **A** a `76.76.21.21` y un **CNAME** `www` a `cname.vercel-dns.com`.
4. **Configurar Supabase (Opcional):**
   - Ejecuta el script SQL incluido en `supabase_schema.sql` en el SQL Editor de tu proyecto Supabase.
   - Agrega las variables en Vercel:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `ADMIN_EMAIL`
     - `ADMIN_PASSWORD`
