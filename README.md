# NOXA — Plataforma Oficial (GTD COLOMBIA SAS)

> **Embudo de Identidad de Marca y Estilo de Vida (Brand Funnel)** para hombres de contextura grande y robusta (**Tallas L a 4XL**).
> Diseñado bajo la estética *Quiet Luxury* y Minimalismo Arquitectónico.

---

## ⚠️ Regla Fundamental del Proyecto
- **NO ES UNA TIENDA ONLINE NI PLATAFORMA DE VENTA DIRECTA.**
- **0% Precios, 0% Signos de moneda ($), 0% Carritos de compra, 0% Descuentos numéricos.**
- El objetivo es generar conexión con la identidad de marca, diagnosticar el fit anatómico del usuario en 5 pasos y canalizarlo a una **asesoría de fit personalizada vía WhatsApp (+57 311 523 0622)**.

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
  - **Correo:** `admin@noxa.lat`
  - **Contraseña:** `Noxa2026!*`

### Módulos del Panel:
1. **Bandeja de Leads (CRM):** Visualiza en tiempo real los registros completados en el Diagnóstico de Fit, con estado de gestión, botón de **Chat en WhatsApp 1-Clic** y botón de **Exportar a CSV**.
2. **Embudo & WhatsApp:** Edita el número de WhatsApp receptor, los umbrales de peso para el cálculo de tallas y las **3 plantillas dinámicas de mensajes**:
   - Plantilla General (Camisetas / Ambos)
   - Plantilla Bóxers Ergonómicos
   - Plantilla Modo Regalo
3. **Textos & Manifiesto:** Edita el Hero, frases de marca, secciones de empatía y respaldo corporativo sin tocar código.
4. **Líneas de Prendas:** Conmutador para activar/desactivar prendas y editar especificaciones textiles (siempre sin precios).
5. **Galería & Medios:** Selector y visualizador de recursos de marca y lookbook.

---

## 📦 Despliegue en Producción (Vercel + Supabase)

1. **Subir a GitHub / Repositorio Git.**
2. **Importar en Vercel:** Detectará automáticamente el proyecto Next.js.
3. **Configurar Supabase (Opcional):**
   - Ejecuta el script SQL incluido en `supabase_schema.sql` en el SQL Editor de tu proyecto Supabase.
   - Agrega las variables en Vercel:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `ADMIN_EMAIL`
     - `ADMIN_PASSWORD`
4. *Si no se configuran variables de Supabase*, el sitio opera con persistencia local basada en `data/site-content.json` y `data/leads.json` de forma inmediata.

---

## 🏢 Respaldo Corporativo Oficial
- **Razón Social:** GTD COLOMBIA SAS
- **NIT:** 900195679-1
- **Matrícula Mercantil:** 882067-92 (Cámara de Comercio de Cali)
- **Sede:** CL 18 NORTE # 85 - 810 CS 36, Cali – Valle del Cauca, Colombia
- **Correo:** talento@noxa.lat
- **Línea oficial / WhatsApp:** +57 311 523 0622
