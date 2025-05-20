"use client";
import { ClienteForm } from "@/components/ClienteForm";
import { EntregadorForm } from "@/components/EntregadorForm";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">ZK Delivery 🚚🔒</h1>
      <ClienteForm />
      <hr className="my-6" />
      <EntregadorForm />
    </main>
  );
}
