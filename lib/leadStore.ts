import fs from "fs";
import path from "path";
import { LeadRecord } from "@/types";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

const leadsFilePath = path.join(process.cwd(), "data", "leads.json");

export async function getLeads(): Promise<LeadRecord[]> {
  // 1. Try Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((item) => ({
          id: item.id,
          createdAt: item.created_at,
          fullName: item.full_name,
          city: item.city,
          phone: item.phone,
          preference: item.preference,
          currentSize: item.current_size,
          fitStyle: item.fit_style,
          heightCm: item.height_cm,
          weightKg: item.weight_kg,
          recommendedSize: item.recommended_size,
          status: item.status || "nuevo",
          notes: item.notes || ""
        }));
      }
    } catch (err) {
      console.warn("Supabase leads query failed, using local file:", err);
    }
  }

  // 2. Read from local JSON
  try {
    if (fs.existsSync(leadsFilePath)) {
      const raw = fs.readFileSync(leadsFilePath, "utf8");
      return JSON.parse(raw) as LeadRecord[];
    }
  } catch (err) {
    console.error("Error reading local leads.json:", err);
  }

  return [];
}

export async function addLead(lead: Omit<LeadRecord, "id" | "createdAt" | "status">): Promise<LeadRecord> {
  const newRecord: LeadRecord = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "nuevo"
  };

  // 1. Save to local JSON file
  try {
    const existing = await getLeads();
    const updated = [newRecord, ...existing];
    fs.writeFileSync(leadsFilePath, JSON.stringify(updated, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing lead to local file:", err);
  }

  // 2. Sync to Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("leads").insert({
        full_name: lead.fullName,
        city: lead.city,
        phone: lead.phone,
        preference: lead.preference,
        current_size: lead.currentSize,
        fit_style: lead.fitStyle,
        height_cm: lead.heightCm,
        weight_kg: lead.weightKg,
        recommended_size: lead.recommendedSize,
        status: "nuevo"
      });

      if (error) {
        console.warn("Supabase lead insertion error:", error);
      }
    } catch (err) {
      console.warn("Supabase insert lead failed:", err);
    }
  }

  return newRecord;
}

export async function updateLeadStatus(id: string, status: LeadRecord["status"], notes?: string): Promise<boolean> {
  let success = false;

  // Local update
  try {
    const leads = await getLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx !== -1) {
      leads[idx].status = status;
      if (notes !== undefined) leads[idx].notes = notes;
      fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), "utf8");
      success = true;
    }
  } catch (err) {
    console.error("Error updating local lead:", err);
  }

  // Supabase update
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from("leads")
        .update({ status, ...(notes !== undefined ? { notes } : {}) })
        .eq("id", id);
    } catch (err) {
      console.warn("Supabase lead status update failed:", err);
    }
  }

  return success;
}
