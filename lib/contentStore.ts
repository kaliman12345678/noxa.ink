import fs from "fs";
import path from "path";
import { SiteContent } from "@/types";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

const dataFilePath = path.join(process.cwd(), "data", "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  // 1. Try Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", "main_config")
        .single();

      if (!error && data?.data) {
        return data.data as SiteContent;
      }
    } catch (err) {
      console.warn("Supabase query failed, falling back to local file:", err);
    }
  }

  // 2. Read from local JSON
  try {
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(raw) as SiteContent;
    }
  } catch (err) {
    console.error("Error reading local site-content.json:", err);
  }

  throw new Error("Unable to load site content");
}

export async function saveSiteContent(newContent: SiteContent): Promise<boolean> {
  let fileSaved = false;

  // 1. Always save to local JSON file for instant reliability
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(newContent, null, 2), "utf8");
    fileSaved = true;
  } catch (err) {
    console.error("Error writing to local site-content.json:", err);
  }

  // 2. Sync with Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({
          id: "main_config",
          data: newContent,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.warn("Supabase upsert failed:", error);
      }
    } catch (err) {
      console.warn("Supabase sync failed:", err);
    }
  }

  return fileSaved;
}
