-- ==============================================================================
-- NOXA (GTD COLOMBIA SAS) - Supabase Database Schema
-- Tablas para Embudo de Identidad de Marca, Contenidos y Leads CRM
-- ==============================================================================

-- 1. Tabla de Leads (Clientes potenciales generados en el Diagnóstico de Fit de 5 pasos)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    city TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    interest TEXT NOT NULL, -- 'Camisetas', 'Bóxers', 'Ambos', 'Regalo'
    height_cm INTEGER NOT NULL,
    weight_kg INTEGER NOT NULL,
    usual_size TEXT,
    fit_preference TEXT NOT NULL, -- 'Estructurada y firme' | 'Relajada y fresca'
    palette TEXT NOT NULL, -- 'Negro esencial' | 'Azul Marino y Gris' | 'Surtida'
    calculated_size TEXT NOT NULL, -- 'L', 'XL', '2XL', '3XL', '4XL'
    notes TEXT,
    status TEXT DEFAULT 'nuevo' NOT NULL -- 'nuevo', 'contactado', 'asesorado', 'completado'
);

-- Habilitar RLS en leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política de inserción pública (cualquier visitante del quiz puede enviar su lead)
CREATE POLICY "Public insert leads" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Política de lectura y gestión sólo para usuarios autenticados (Admin)
CREATE POLICY "Admin full access leads" ON public.leads
    FOR ALL USING (auth.role() = 'authenticated');

-- 2. Tabla de Contenido del Sitio (Configuración CMS sin código)
CREATE TABLE IF NOT EXISTS public.site_content (
    id TEXT PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS en site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Lectura pública para el contenido del frontend
CREATE POLICY "Public read site_content" ON public.site_content
    FOR SELECT USING (true);

-- Edición exclusiva para el Admin
CREATE POLICY "Admin update site_content" ON public.site_content
    FOR ALL USING (auth.role() = 'authenticated');

-- 3. Índices para optimización de consultas
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON public.leads (whatsapp);
