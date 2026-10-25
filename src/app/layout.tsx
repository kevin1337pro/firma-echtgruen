import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://echtgruen-konzept-kevin.kevin1337pro.chatgpt.site"),
  title: "EchtGrün — Grün mit Charakter. | Website-Konzept",
  description: "Baum- und Landschaftspflege, Garten- und Landschaftsbau und Energieholz. Ein unabhängiges Website-Konzept für EchtGrün aus Leichlingen.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "EchtGrün — Grün mit Charakter.", description: "Eine neue Perspektive auf Handwerk, Natur und starke Technik. Unabhängiges Website-Konzept.", images: ["/images/echtgruen-truck.jpg"], locale: "de_DE", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="de"><body>{children}</body></html>; }
