import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZK Delivery",
  description: "Sistema de entregas com prova ZK",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head />
      <body>{children}</body>
    </html>
  );
}
