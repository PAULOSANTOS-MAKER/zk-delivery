"use client";
import React from "react";
import { useZkDelivery } from "../lib/useZkDelivery";

export function ClienteForm() {
  const { cadastrarPedido } = useZkDelivery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const peso = "10 kg";
    const tamanho = "2 m²";
    const retirada = "Rua Plínio Colas, 290 - Lauzane Paulista, São Paulo - CEP 02435030";
    const entrega = "Rua Plínio Colas, 87 - Lauzane Paulista, São Paulo - CEP 02435030";
    const hash = 140891; // Exemplo de hash gerado pelo código secreto

    try {
      const tx = await cadastrarPedido(retirada, entrega, peso, tamanho, hash);
      console.log("✅ Pedido cadastrado! Hash:", tx.hash);
      alert("✅ Pedido cadastrado na blockchain!");
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      alert("❌ Erro ao cadastrar pedido.");
    }
  };

  return (
    <div>
      <h3>Cadastro de Pedido</h3>
      <button onClick={handleSubmit}>Cadastrar Pedido</button>
    </div>
  );
}
