import { NextResponse } from "next/server";
import { getLeads } from "@/lib/storage";

export async function GET() {
  try {
    const leads = getLeads();

    const headers = [
      "ID",
      "Fecha",
      "Nombre",
      "Ciudad",
      "WhatsApp",
      "Interes",
      "Estatura_cm",
      "Peso_kg",
      "Talla_Habitual",
      "Preferencia_Caida",
      "Paleta_Color",
      "Talla_Calculada_NOXA",
      "Estado",
      "Notas",
    ];

    const escapeCsv = (str: string | number = "") => {
      const stringValue = String(str);
      if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const rows = leads.map((l) => [
      escapeCsv(l.id),
      escapeCsv(new Date(l.createdAt).toLocaleString("es-CO")),
      escapeCsv(l.fullName),
      escapeCsv(l.city),
      escapeCsv(l.whatsapp),
      escapeCsv(l.interest),
      escapeCsv(l.heightCm),
      escapeCsv(l.weightKg),
      escapeCsv(l.usualSize),
      escapeCsv(l.fitPreference),
      escapeCsv(l.palette),
      escapeCsv(l.calculatedSize),
      escapeCsv(l.status),
      escapeCsv(l.notes || ""),
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-noxa-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { success: false, error: "Error al exportar CSV" },
      { status: 500 }
    );
  }
}
