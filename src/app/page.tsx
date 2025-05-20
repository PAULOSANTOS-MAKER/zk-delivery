"use client";
import { useEffect } from "react";

export default function TesteCarteira() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      console.log("✅ Carteira detectada:", window.ethereum);
    } else {
      console.error("❌ Metamask não detectado no navegador");
    }
  }, []);

  const conectarCarteira = async () => {
    if (!window.ethereum) {
      alert("❌ Metamask não detectado!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      alert(`✅ Conectado: ${accounts[0]}`);
    } catch (err) {
      console.error("Erro ao conectar:", err);
      alert("❌ Erro ao conectar carteira.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Teste de Carteira</h1>
      <button
        onClick={conectarCarteira}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Conectar Carteira
      </button>
    </div>
  );
}

