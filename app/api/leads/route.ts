import { NextResponse } from "next/server";
import { getLeads, saveLead, updateLeadStatus } from "@/lib/storage";

export async function GET() {
  try {
    const leads = getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener leads" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const rawPhone = body.whatsapp || body.phone;
    if (!body.fullName || !rawPhone) {
      return NextResponse.json(
        { success: false, error: "Nombre y WhatsApp son obligatorios" },
        { status: 400 }
      );
    }

    const saved = saveLead({
      fullName: body.fullName,
      city: body.city || "Colombia",
      whatsapp: rawPhone,
      interest: body.interest || body.preference || "Camisetas",
      heightCm: body.heightCm ? Number(body.heightCm) : 178,
      weightKg: body.weightKg ? Number(body.weightKg) : 95,
      usualSize: body.usualSize || body.currentSize || "2XL",
      fitPreference: body.fitPreference || body.fitStyle || "Estructurada y firme",
      palette: body.palette || "Negro esencial",
      calculatedSize: body.calculatedSize || body.recommendedSize || "2XL",
      notes: body.notes || "",
    });

    return NextResponse.json({ success: true, lead: saved });
  } catch (error) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Error al guardar lead" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID y Estado son obligatorios" },
        { status: 400 }
      );
    }

    const updated = updateLeadStatus(id, status, notes);
    return NextResponse.json({ success: updated });
  } catch (error) {
    console.error("PATCH /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar lead" },
      { status: 500 }
    );
  }
}
