"use client";
import React, { useState } from "react";
import { useZkDelivery } from "../lib/useZkDelivery";

export function EntregadorForm() {
  const { verificarEntrega } = useZkDelivery();
  const [codigo, setCodigo] = useState("");

  const handleVerificar = async () => {
    try {
      const a: [bigint, bigint] = [1n, 2n];
      const b: [[bigint, bigint], [bigint, bigint]] = [
        [3n, 4n],
        [5n, 6n],
      ];
      const c: [bigint, bigint] = [7n, 8n];
      const input: [bigint] = [BigInt(codigo)];

      const tx = await verificarEntrega(a, b, c, input);
      console.log("Entrega verificada:", tx.hash);
      alert("✅ Entrega verificada na blockchain!");
    } catch (err) {
      console.error(err);
      alert("❌ Erro ao verificar entrega");
    }
  };

  return (
    <div>
      <h3>Verificação de Entrega</h3>
      <input
        type="number"
        placeholder="Código secreto"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <button onClick={handleVerificar}>Verificar Entrega</button>
    </div>
  );
}
