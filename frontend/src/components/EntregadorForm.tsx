"use client";

import { useState } from "react";

export function EntregadorForm() {
  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [dadosEntrega, setDadosEntrega] = useState<any | null>(null);
  const [erro, setErro] = useState("");

  const verificarPedido = () => {
    const salvo = localStorage.getItem("zkPedido");
    if (!salvo) {
      setErro("❌ Nenhum pedido encontrado.");
      return;
    }

    const pedido = JSON.parse(salvo);

    if (pedido.codigo !== codigoDigitado) {
      setErro("❌ Código inválido.");
      setDadosEntrega(null);
      return;
    }

    setErro("");
    setDadosEntrega(pedido);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-bold mb-2">🚚 Entregador</h2>

      <input
        type="text"
        placeholder="Digite o código secreto"
        value={codigoDigitado}
        onChange={(e) => setCodigoDigitado(e.target.value)}
        className="w-full p-2 border mb-2"
      />

      <button
        onClick={verificarPedido}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Verificar Pedido
      </button>

      {erro && <p className="mt-2 text-red-600 text-sm">{erro}</p>}

      {dadosEntrega && (
        <div className="mt-4 border-t pt-4 text-sm text-gray-800 space-y-1">
          <p><strong>📦 Peso:</strong> {dadosEntrega.peso} kg</p>
          <p><strong>📐 Tamanho:</strong> {dadosEntrega.tamanho} m²</p>
          <p><strong>🏠 Retirada:</strong> {dadosEntrega.retirada}</p>
          <p><strong>📦 Entrega:</strong> {dadosEntrega.entrega}</p>
          <p><strong>🔒 Código:</strong> {dadosEntrega.codigo}</p>
        </div>
      )}
    </div>
  );
}
