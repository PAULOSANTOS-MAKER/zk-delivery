"use client";

import React, { useState } from "react";
import { ClienteForm } from "../components/ClienteForm";
import { EntregadorForm } from "../components/EntregadorForm";
import Login from "../components/Login";

export default function HomePage() {
  const [usuario, setUsuario] = useState<string | null>(null);

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>ZK Delivery 🚚🔒</h1>

      {!usuario ? (
        <Login onLogin={(endereco) => setUsuario(endereco)} />
      ) : (
        <>
          <p>Logado como: {usuario}</p>
          <hr />
          <h2>Cadastrar Pedido</h2>
          <ClienteForm />

          <hr />
          <h2>Verificar Pedido</h2>
          <EntregadorForm />
        </>
      )}
    </main>
  );
}
