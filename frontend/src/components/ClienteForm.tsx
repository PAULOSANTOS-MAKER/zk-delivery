"use client";

import { useState } from "react";

export function ClienteForm() {
  const [form, setForm] = useState({
    peso: "",
    tamanho: "",
    codigo: "",
    retirada: "",
    entrega: "",
  });

  const [status, setStatus] = useState("");
  const [pedidoSalvo, setPedidoSalvo] = useState<any | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.codigo || !form.peso || !form.tamanho || !form.retirada || !form.entrega) {
      setStatus("❌ Preencha todos os campos.");
      return;
    }

    localStorage.setItem("zkPedido", JSON.stringify(form));
    setPedidoSalvo(form);
    setStatus("✅ Pedido cadastrado com sucesso!");
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">🧾 Cliente</h2>

      {/* Peso (kg) */}
      <div className="flex items-center gap-2 mb-2">
        <input
          type="number"
          name="peso"
          placeholder="Peso"
          value={form.peso}
          onChange={handleChange}
          className="w-full p-2 border"
          step="0.01"
        />
        <span className="text-sm">kg</span>
      </div>

      {/* Tamanho (m²) */}
      <div className="flex items-center gap-2 mb-2">
        <input
          type="number"
          name="tamanho"
          placeholder="Tamanho em m²"
          value={form.tamanho}
          onChange={handleChange}
          className="w-full p-2 border"
          step="0.01"
        />
        <span className="text-sm">m²</span>
      </div>

      {/* Endereço de retirada */}
      <input
        type="text"
        name="retirada"
        placeholder="Endereço de retirada"
        value={form.retirada}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      />

      {/* Endereço de entrega */}
      <input
        type="text"
        name="entrega"
        placeholder="Endereço de entrega"
        value={form.entrega}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      />

      {/* Código secreto */}
      <input
        type="text"
        name="codigo"
        placeholder="Código Secreto"
        value={form.codigo}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Cadastrar Pedido
      </button>

      <p className="mt-2 text-sm">{status}</p>

      {pedidoSalvo && (
        <div className="mt-4 border-t pt-4 text-sm text-gray-800 space-y-1">
          <p><strong>📦 Peso:</strong> {pedidoSalvo.peso} kg</p>
          <p><strong>📐 Tamanho:</strong> {pedidoSalvo.tamanho} m²</p>
          <p><strong>🏠 Retirada:</strong> {pedidoSalvo.retirada}</p>
          <p><strong>📦 Entrega:</strong> {pedidoSalvo.entrega}</p>
          <p><strong>🔒 Código Secreto:</strong> {pedidoSalvo.codigo}</p>
        </div>
      )}
    </div>
  );
}
