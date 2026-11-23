"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@noxa.lat");
  const [password, setPassword] = useState("Noxa2026!*");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Store in localStorage for immediate client-side persistence
        localStorage.setItem("noxa_admin_auth", "true");
        router.push("/admin");
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-noxa-bg flex flex-col items-center justify-center p-4 relative">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-gradient from-noxa-surface/40 via-noxa-bg to-noxa-bg pointer-events-none" />

      <div className="w-full max-w-md bg-noxa-surface border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        {/* Logo oficial */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative h-12 w-44 mb-3">
            <Image
              src="/brand/logo.png"
              alt="NOXA Logo Oficial"
              fill
              priority
              className="object-contain"
            />
          </div>
          <span className="text-[10px] tracking-ultra text-noxa-sand uppercase font-mono">
            Panel de Control Oficial
          </span>
          <p className="text-xs text-zinc-400 mt-1">
            Gestión de embudo, contenidos y leads CRM
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-wide text-noxa-concrete block mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-noxa-bg border border-white/10 focus:border-noxa-sand rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-600 outline-none transition-colors"
                placeholder="admin@noxa.lat"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wide text-noxa-concrete block mb-1.5">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-noxa-bg border border-white/10 focus:border-noxa-sand rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-600 outline-none transition-colors"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full bg-noxa-sand hover:bg-noxa-sandHover text-noxa-bg font-semibold text-xs uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-noxa-sand/20 disabled:opacity-50"
            >
              <span>{loading ? "Verificando..." : "Acceder al Panel"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Demo Hint */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-zinc-500 text-[11px]">
          <div className="flex items-center justify-center gap-1.5 text-noxa-concrete mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-noxa-sand" />
            <span>Credenciales demo por defecto:</span>
          </div>
          <code className="text-[10px] text-noxa-sand bg-white/5 px-2 py-0.5 rounded font-mono">
            admin@noxa.lat / Noxa2026!*
          </code>
        </div>
      </div>
    </div>
  );
}
