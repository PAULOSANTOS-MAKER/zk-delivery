"use client";
import React, { useState } from "react";
import { useZkDelivery } from "../lib/useZkDelivery";

export function ClienteForm() {
  const { cadastrarPedido } = useZkDelivery();

  const [form, setForm] = useState({
    retirada: "",
    entrega: "",
    peso: "",
    tamanho: "",
    codigo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hash = parseInt(form.codigo); // código secreto convertido para inteiro
      const tx = await cadastrarPedido(form.retirada, form.entrega, form.peso, form.tamanho, hash);
      console.log("✅ Pedido cadastrado! Hash:", tx.hash);
      alert("✅ Pedido cadastrado na blockchain!");
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      alert("❌ Erro ao cadastrar pedido.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Cadastro de Pedido</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="retirada"
          placeholder="Endereço de retirada"
          value={form.retirada}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="entrega"
          placeholder="Endereço de entrega"
          value={form.entrega}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="peso"
          placeholder="Peso do produto"
          value={form.peso}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="tamanho"
          placeholder="Tamanho do produto"
          value={form.tamanho}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="number"
          name="codigo"
          placeholder="Código secreto (para verificação ZK)"
          value={form.codigo}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Cadastrar Pedido
        </button>
      </form>
    </div>
  );
}
