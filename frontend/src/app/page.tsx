"use client";

import { ClienteForm } from "../components/ClienteForm";
import { EntregadorForm } from "../components/EntregadorForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">ZK Delivery 🚚🔒</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <ClienteForm />
        <EntregadorForm />
      </div>
    </main>
  );
}
