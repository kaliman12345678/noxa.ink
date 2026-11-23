import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://noxa.lat"),
  title: "NOXA | La talla cambia, la actitud no. (L a 4XL)",
  description:
    "Prendas de alto gramaje e ingeniería textil diseñadas para hombres de talla grande (L a 4XL). Camisetas estructuradas y bóxers ergonómicos por GTD Colombia SAS.",
  icons: {
    icon: "/brand/favicon.png",
    shortcut: "/brand/favicon.png",
    apple: "/brand/favicon.png",
  },
  openGraph: {
    title: "NOXA | El fit que mereces (L a 4XL)",
    description:
      "Prendas pensadas para tu cuerpo, no para encajar en un molde. Confección en alto gramaje y bóxers ergonómicos.",
    images: ["/brand/logo.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/brand/favicon.png" type="image/png" />
      </head>
      <body className="min-h-screen bg-noxa-bg text-noxa-bone antialiased">
        {children}
      </body>
    </html>
  );
}
