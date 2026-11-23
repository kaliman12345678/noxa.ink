import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "admin@noxa.lat";
    const expectedPassword = process.env.ADMIN_PASSWORD || "Noxa2026!*";

    if (
      email?.trim().toLowerCase() === expectedEmail.toLowerCase() &&
      password === expectedPassword
    ) {
      // Set simple auth cookie
      const cookieStore = cookies();
      cookieStore.set("noxa_admin_token", "noxa-authenticated-session-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({
        success: true,
        user: { email: expectedEmail, role: "admin" },
      });
    }

    return NextResponse.json(
      { success: false, error: "Credenciales de administrador inválidas" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, error: "Error en el servidor de autenticación" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete("noxa_admin_token");
  return NextResponse.json({ success: true });
}
