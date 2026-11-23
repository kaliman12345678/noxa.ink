import fs from "fs";
import path from "path";
import { SiteContent, Lead } from "./types";
import { DEFAULT_SITE_CONTENT } from "./defaultContent";

const contentFilePath = path.join(process.cwd(), "data", "site-content.json");
const leadsFilePath = path.join(process.cwd(), "data", "leads.json");

export function getSiteContent(): SiteContent {
  try {
    if (fs.existsSync(contentFilePath)) {
      const raw = fs.readFileSync(contentFilePath, "utf-8");
      const parsed = JSON.parse(raw);
      const defaultQuiz = DEFAULT_SITE_CONTENT.quizConfig || {
        thresholds: { lMaxWeight: 88, xlMaxWeight: 99, xxlMaxWeight: 114, xxxlMaxWeight: 130 },
        whatsappTemplates: { general: "", boxers: "", regalo: "" }
      };

      return {
        ...DEFAULT_SITE_CONTENT,
        ...parsed,
        quizConfig: {
          ...defaultQuiz,
          ...(parsed.quizConfig || {}),
          thresholds: {
            ...defaultQuiz.thresholds,
            ...(parsed.quizConfig?.thresholds || {}),
          },
          whatsappTemplates: {
            ...defaultQuiz.whatsappTemplates,
            ...(parsed.quizConfig?.whatsappTemplates || {}),
          },
        },
      };
    }
  } catch (error) {
    console.error("Error reading site content, using default fallback:", error);
  }
  return DEFAULT_SITE_CONTENT;
}

export function saveSiteContent(content: SiteContent): boolean {
  try {
    fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving site content:", error);
    return false;
  }
}

export function getLeads(): Lead[] {
  try {
    if (!fs.existsSync(leadsFilePath)) {
      return [];
    }
    const raw = fs.readFileSync(leadsFilePath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading leads:", error);
    return [];
  }
}

export function saveLead(leadData: Omit<Lead, "id" | "createdAt" | "status">): Lead {
  const leads = getLeads();
  const newLead: Lead = {
    ...leadData,
    id: `noxa-lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: "nuevo",
  };
  leads.unshift(newLead);
  fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), "utf-8");
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead["status"], notes?: string): boolean {
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return false;
  leads[index].status = status;
  if (notes !== undefined) {
    leads[index].notes = notes;
  }
  fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), "utf-8");
  return true;
}
