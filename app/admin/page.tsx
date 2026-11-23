"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Image as ImageIcon,
  Layers,
  Settings,
  Users,
  LogOut,
  Save,
  Download,
  ExternalLink,
  MessageCircle,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { SiteContent, Lead } from "@/lib/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "textos" | "medios" | "prendas" | "embudo" | "leads"
  >("leads");

  const [content, setContent] = useState<SiteContent | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>("");

  useEffect(() => {
    // Auth check
    const isAuth = localStorage.getItem("noxa_admin_auth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    loadData();
  }, [router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [contentRes, leadsRes] = await Promise.all([
        fetch("/api/admin/content"),
        fetch("/api/leads"),
      ]);

      const contentData = await contentRes.json();
      const leadsData = await leadsRes.json();

      if (contentData.success) {
        setContent(contentData.content);
      }
      if (leadsData.success) {
        setLeads(leadsData.leads);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async () => {
    if (!content) return;
    setSaving(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (data.success) {
        setSaveMessage("✓ Cambios guardados exitosamente.");
        setTimeout(() => setSaveMessage(""), 4000);
      } else {
        setSaveMessage("Error al guardar: " + data.error);
      }
    } catch (err) {
      setSaveMessage("Error de red al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleLeadStatusChange = async (id: string, newStatus: Lead["status"]) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error("Error updating lead status:", err);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    localStorage.removeItem("noxa_admin_auth");
    router.push("/admin/login");
  };

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-noxa-bg flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-noxa-sand animate-spin" />
          <span className="text-xs uppercase tracking-wide text-noxa-concrete font-mono">
            Cargando Panel Administrativo NOXA...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noxa-bg text-noxa-bone flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-noxa-surface border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="relative h-8 w-28">
            <Image
              src="/brand/logo.png"
              alt="NOXA Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xs text-noxa-concrete border-l border-white/10 pl-3 uppercase tracking-wider font-mono">
            CMS & CRM Oficial
          </span>
        </div>

        <div className="flex items-center gap-3">
          {saveMessage && (
            <span className="text-xs text-noxa-sand animate-fade-in font-medium">
              {saveMessage}
            </span>
          )}
          <button
            onClick={handleSaveContent}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-noxa-sand hover:bg-noxa-sandHover text-noxa-bg px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Guardando..." : "Guardar Cambios"}</span>
          </button>
          <Link
            href="/"
            target="_blank"
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            title="Ver Sitio Web Público"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 bg-noxa-surface/60 border-r border-white/5 p-4 space-y-1">
          {[
            { id: "leads", label: "Bandeja de Leads (CRM)", icon: Users, badge: leads.length },
            { id: "embudo", label: "Embudo & WhatsApp", icon: Settings },
            { id: "textos", label: "Textos & Manifiesto", icon: FileText },
            { id: "prendas", label: "Líneas de Prendas", icon: Layers },
            { id: "medios", label: "Galería & Medios", icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-noxa-sand text-noxa-bg font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isSelected
                        ? "bg-noxa-bg text-noxa-sand"
                        : "bg-white/10 text-zinc-300"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-6 sm:p-10 max-w-6xl">
          {/* TAB 1: BANDEJA DE LEADS (CRM) */}
          {activeTab === "leads" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-headline text-2xl uppercase tracking-wide text-white">
                    Bandeja de Leads del Diagnóstico de Fit
                  </h2>
                  <p className="text-xs text-noxa-concrete">
                    Total de clientes potenciales registrados desde el embudo interactivo de 5 pasos.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="/api/leads/export"
                    className="inline-flex items-center gap-2 border border-white/15 hover:border-noxa-sand/50 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs text-noxa-bone transition-all"
                  >
                    <Download className="w-4 h-4 text-noxa-sand" />
                    <span>Exportar a CSV</span>
                  </a>
                  <button
                    onClick={loadData}
                    className="p-2 border border-white/10 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                    title="Actualizar"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {leads.length === 0 ? (
                <div className="bg-noxa-surface border border-white/5 rounded-2xl p-12 text-center text-zinc-500 text-sm">
                  Aún no hay leads registrados. Completa el diagnóstico en la vista pública para generar el primero.
                </div>
              ) : (
                <div className="bg-noxa-surface border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-black/40 text-[10px] uppercase tracking-wider text-noxa-concrete border-b border-white/10">
                        <tr>
                          <th className="py-3.5 px-4">Fecha</th>
                          <th className="py-3.5 px-4">Cliente</th>
                          <th className="py-3.5 px-4">Ciudad</th>
                          <th className="py-3.5 px-4">Interés</th>
                          <th className="py-3.5 px-4">Medidas</th>
                          <th className="py-3.5 px-4">Caída / Paleta</th>
                          <th className="py-3.5 px-4">Talla NOXA</th>
                          <th className="py-3.5 px-4">Estado</th>
                          <th className="py-3.5 px-4 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-zinc-300">
                        {leads.map((lead) => {
                          const cleanPhone = lead.whatsapp.replace(/[^0-9]/g, "");
                          const waUrl = `https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(
                            lead.fullName
                          )}%2C%20te%20escribimos%20de%20NOXA%20para%20tu%20asesor%C3%ADa%20en%20talla%20${
                            lead.calculatedSize
                          }.`;

                          return (
                            <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-3 px-4 font-mono text-[10px] text-zinc-500 whitespace-nowrap">
                                {new Date(lead.createdAt).toLocaleDateString("es-CO", {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-medium text-white">{lead.fullName}</div>
                                <div className="text-[10px] text-zinc-400 font-mono">
                                  {lead.whatsapp}
                                </div>
                              </td>
                              <td className="py-3 px-4">{lead.city}</td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 rounded-md text-[10px] bg-white/5 text-noxa-sand border border-white/5">
                                  {lead.interest}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-mono text-[11px]">
                                {lead.heightCm}cm | {lead.weightKg}kg
                              </td>
                              <td className="py-3 px-4 text-[11px] text-zinc-400">
                                <div>{lead.fitPreference}</div>
                                <div className="text-[10px] text-zinc-500">{lead.palette}</div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-headline text-base text-noxa-sand font-bold">
                                  {lead.calculatedSize}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <select
                                  value={lead.status}
                                  onChange={(e) =>
                                    handleLeadStatusChange(lead.id, e.target.value as any)
                                  }
                                  className="bg-noxa-bg border border-white/10 rounded-lg px-2 py-1 text-[11px] text-zinc-300 outline-none"
                                >
                                  <option value="nuevo">Nuevo</option>
                                  <option value="contactado">Contactado</option>
                                  <option value="asesorado">Asesorado</option>
                                  <option value="completado">Completado</option>
                                </select>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 bg-noxa-sand/15 hover:bg-noxa-sand text-noxa-sand hover:text-noxa-bg px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                  title="Iniciar conversación en WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>Chat 1-Clic</span>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EMBUDO & WHATSAPP CONFIGURATION */}
          {activeTab === "embudo" && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="font-headline text-2xl uppercase tracking-wide text-white">
                  Configuración del Embudo & WhatsApp
                </h2>
                <p className="text-xs text-noxa-concrete">
                  Edita las 3 plantillas de mensajes, el número de atención y los umbrales de peso para el cálculo de tallas.
                </p>
              </div>

              {/* Canal WhatsApp Oficial */}
              <div className="bg-noxa-surface border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="font-headline text-lg uppercase text-white flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-noxa-sand" />
                  Línea de WhatsApp Receptora
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-noxa-concrete block mb-1.5">
                      Número en Formato Internacional (Sin + ni espacios)
                    </label>
                    <input
                      type="text"
                      value={content.brand.whatsappNumber}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          brand: { ...content.brand, whatsappNumber: e.target.value },
                        })
                      }
                      className="w-full bg-noxa-bg border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-noxa-sand font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-noxa-concrete block mb-1.5">
                      Formato Visible para el Cliente
                    </label>
                    <input
                      type="text"
                      value={content.brand.whatsappFormatted}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          brand: { ...content.brand, whatsappFormatted: e.target.value },
                        })
                      }
                      className="w-full bg-noxa-bg border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-noxa-sand"
                    />
                  </div>
                </div>
              </div>

              {/* Plantillas de WhatsApp Dinámicas */}
              <div className="bg-noxa-surface border border-white/10 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="font-headline text-lg uppercase text-white mb-1">
                    Plantillas de Mensaje Dinámicas
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Variables disponibles: <code className="text-noxa-sand">{"{nombre}"}</code>,{" "}
                    <code className="text-noxa-sand">{"{ciudad}"}</code>,{" "}
                    <code className="text-noxa-sand">{"{talla}"}</code>,{" "}
                    <code className="text-noxa-sand">{"{prenda}"}</code>,{" "}
                    <code className="text-noxa-sand">{"{caida}"}</code>,{" "}
                    <code className="text-noxa-sand">{"{paleta}"}</code>,{" "}
                    <code className="text-noxa-sand">{"{estatura}"}</code>,{" "}
                    <code className="text-noxa-sand">{"{peso}"}</code>.
                  </p>
                </div>

                {/* Template 1: General */}
                <div>
                  <label className="text-xs uppercase tracking-wide text-noxa-sand font-medium block mb-1.5">
                    1. Plantilla General (Camisetas / Ambos)
                  </label>
                  <textarea
                    rows={3}
                    value={content.quizConfig.whatsappTemplates.general}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        quizConfig: {
                          ...content.quizConfig,
                          whatsappTemplates: {
                            ...content.quizConfig.whatsappTemplates,
                            general: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full bg-noxa-bg border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-noxa-sand font-mono"
                  />
                </div>

                {/* Template 2: Bóxers */}
                <div>
                  <label className="text-xs uppercase tracking-wide text-noxa-sand font-medium block mb-1.5">
                    2. Plantilla Bóxers Ergonómicos
                  </label>
                  <textarea
                    rows={3}
                    value={content.quizConfig.whatsappTemplates.boxers}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        quizConfig: {
                          ...content.quizConfig,
                          whatsappTemplates: {
                            ...content.quizConfig.whatsappTemplates,
                            boxers: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full bg-noxa-bg border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-noxa-sand font-mono"
                  />
                </div>

                {/* Template 3: Regalo */}
                <div>
                  <label className="text-xs uppercase tracking-wide text-noxa-sand font-medium block mb-1.5">
                    3. Plantilla Modo Regalo
                  </label>
                  <textarea
                    rows={3}
                    value={content.quizConfig.whatsappTemplates.regalo}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        quizConfig: {
                          ...content.quizConfig,
                          whatsappTemplates: {
                            ...content.quizConfig.whatsappTemplates,
                            regalo: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full bg-noxa-bg border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-noxa-sand font-mono"
                  />
                </div>
              </div>

              {/* Matriz de Umbrales de Peso para Tallas */}
              <div className="bg-noxa-surface border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="font-headline text-lg uppercase text-white">
                  Umbrales de Peso Máximo por Talla (kg)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                      L (Hasta kg):
                    </label>
                    <input
                      type="number"
                      value={content.quizConfig.thresholds.lMaxWeight}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          quizConfig: {
                            ...content.quizConfig,
                            thresholds: {
                              ...content.quizConfig.thresholds,
                              lMaxWeight: Number(e.target.value),
                            },
                          },
                        })
                      }
                      className="w-full bg-noxa-bg border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                      XL (Hasta kg):
                    </label>
                    <input
                      type="number"
                      value={content.quizConfig.thresholds.xlMaxWeight}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          quizConfig: {
                            ...content.quizConfig,
                            thresholds: {
                              ...content.quizConfig.thresholds,
                              xlMaxWeight: Number(e.target.value),
                            },
                          },
                        })
                      }
                      className="w-full bg-noxa-bg border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                      2XL (Hasta kg):
                    </label>
                    <input
                      type="number"
                      value={content.quizConfig.thresholds.xxlMaxWeight}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          quizConfig: {
                            ...content.quizConfig,
                            thresholds: {
                              ...content.quizConfig.thresholds,
                              xxlMaxWeight: Number(e.target.value),
                            },
                          },
                        })
                      }
                      className="w-full bg-noxa-bg border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                      3XL (Hasta kg / Sobre esto 4XL):
                    </label>
                    <input
                      type="number"
                      value={content.quizConfig.thresholds.xxxlMaxWeight}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          quizConfig: {
                            ...content.quizConfig,
                            thresholds: {
                              ...content.quizConfig.thresholds,
                              xxxlMaxWeight: Number(e.target.value),
                            },
                          },
                        })
                      }
                      className="w-full bg-noxa-bg border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEXTOS Y MANIFIESTO */}
          {activeTab === "textos" && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="font-headline text-2xl uppercase tracking-wide text-white">
                  Textos Editoriales & Manifiesto
                </h2>
                <p className="text-xs text-noxa-concrete">
                  Modifica los titulares y copys del Hero, el problema y el respaldo corporativo.
                </p>
              </div>

              {/* Hero Texts */}
              <div className="bg-noxa-surface border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="font-headline text-lg uppercase text-white">Hero Principal</h3>
                <div>
                  <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                    Badge Superior
                  </label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, badge: e.target.value },
                      })
                    }
                    className="w-full bg-noxa-bg border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                    Titular H1
                  </label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, title: e.target.value },
                      })
                    }
                    className="w-full bg-noxa-bg border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-headline text-lg"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                    Subtítulo Narrativo
                  </label>
                  <textarea
                    rows={3}
                    value={content.hero.subtitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, subtitle: e.target.value },
                      })
                    }
                    className="w-full bg-noxa-bg border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>

              {/* Respaldo Corporativo */}
              <div className="bg-noxa-surface border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="font-headline text-lg uppercase text-white">
                  Respaldo Corporativo GTD Colombia SAS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                      Razón Social
                    </label>
                    <input
                      type="text"
                      value={content.brand.operator}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          brand: { ...content.brand, operator: e.target.value },
                        })
                      }
                      className="w-full bg-noxa-bg border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                      NIT
                    </label>
                    <input
                      type="text"
                      value={content.brand.nit}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          brand: { ...content.brand, nit: e.target.value },
                        })
                      }
                      className="w-full bg-noxa-bg border border-white/10 rounded-xl px-4 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                      Dirección Sede Principal
                    </label>
                    <input
                      type="text"
                      value={content.brand.address}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          brand: { ...content.brand, address: e.target.value },
                        })
                      }
                      className="w-full bg-noxa-bg border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LÍNEAS DE PRENDAS (SIN PRECIOS) */}
          {activeTab === "prendas" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-headline text-2xl uppercase tracking-wide text-white">
                  Gestión de Prendas & Piezas Textiles
                </h2>
                <p className="text-xs text-noxa-concrete">
                  Recuerda: NO está permitida la asignación de precios numéricos ni botones de compra directa.
                </p>
              </div>

              <div className="space-y-4">
                {content.garments.map((g, gIdx) => (
                  <div
                    key={g.id}
                    className="bg-noxa-surface border border-white/10 rounded-2xl p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-headline text-lg uppercase text-white">
                          {g.title}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-noxa-sand/10 text-noxa-sand border border-noxa-sand/20">
                          {g.badge}
                        </span>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={g.active}
                          onChange={(e) => {
                            const updated = [...content.garments];
                            updated[gIdx].active = e.target.checked;
                            setContent({ ...content, garments: updated });
                          }}
                          className="accent-noxa-sand"
                        />
                        <span className="text-zinc-400">
                          {g.active ? "Visible" : "Oculta"}
                        </span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                          Título
                        </label>
                        <input
                          type="text"
                          value={g.title}
                          onChange={(e) => {
                            const updated = [...content.garments];
                            updated[gIdx].title = e.target.value;
                            setContent({ ...content, garments: updated });
                          }}
                          className="w-full bg-noxa-bg border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                          Categoría / Badge
                        </label>
                        <input
                          type="text"
                          value={g.category}
                          onChange={(e) => {
                            const updated = [...content.garments];
                            updated[gIdx].category = e.target.value;
                            setContent({ ...content, garments: updated });
                          }}
                          className="w-full bg-noxa-bg border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase text-noxa-concrete block mb-1">
                        Descripción Textil
                      </label>
                      <textarea
                        rows={2}
                        value={g.description}
                        onChange={(e) => {
                          const updated = [...content.garments];
                          updated[gIdx].description = e.target.value;
                          setContent({ ...content, garments: updated });
                        }}
                        className="w-full bg-noxa-bg border border-white/10 rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MEDIOS & GALERÍA */}
          {activeTab === "medios" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="font-headline text-2xl uppercase tracking-wide text-white">
                  Gestión de Medios & Galería
                </h2>
                <p className="text-xs text-noxa-concrete">
                  Rutas de imágenes de personajes, mockups de bóxers y video de fondo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-noxa-surface border border-white/10 rounded-2xl p-5 space-y-3">
                  <span className="text-xs font-semibold text-white uppercase block">
                    Personaje 1 (Hero 3XL)
                  </span>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black/40">
                    <Image
                      src={content.lookbook[0]?.image || "/editorial/personaje-1-hero.jpg"}
                      alt="Hero"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    value={content.lookbook[0]?.image || ""}
                    onChange={(e) => {
                      const updated = [...content.lookbook];
                      if (updated[0]) updated[0].image = e.target.value;
                      setContent({ ...content, lookbook: updated });
                    }}
                    className="w-full bg-noxa-bg border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div className="bg-noxa-surface border border-white/10 rounded-2xl p-5 space-y-3">
                  <span className="text-xs font-semibold text-white uppercase block">
                    Bóxers Mockup Oficial
                  </span>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black/40">
                    <Image
                      src="/brand/boxer-mockup-1.png"
                      alt="Boxers"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono">
                    /brand/boxer-mockup-1.png
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
