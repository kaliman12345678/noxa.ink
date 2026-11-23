import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/storage";
import { SiteContent } from "@/lib/types";

export async function GET() {
  try {
    const content = getSiteContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("GET /api/admin/content error:", error);
    return NextResponse.json(
      { success: false, error: "Error al leer contenido" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const updatedContent: SiteContent = await req.json();

    if (!updatedContent || !updatedContent.brand || !updatedContent.hero) {
      return NextResponse.json(
        { success: false, error: "Estructura de contenido inválida" },
        { status: 400 }
      );
    }

    const saved = saveSiteContent(updatedContent);

    if (!saved) {
      return NextResponse.json(
        { success: false, error: "Error al guardar en almacenamiento" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Contenido guardado exitosamente" });
  } catch (error) {
    console.error("POST /api/admin/content error:", error);
    return NextResponse.json(
      { success: false, error: "Error al procesar solicitud" },
      { status: 500 }
    );
  }
}
