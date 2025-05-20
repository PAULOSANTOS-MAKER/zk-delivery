"use client";

import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

interface LoginProps {
  onLogin: (address: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x1", // Ethereum Mainnet, use 0x5 para Goerli, etc.
            rpcTarget: "https://rpc.ankr.com/eth",
          },
          uiConfig: {
            appName: "ZK Delivery",
            mode: "light",
          },
        });

        const adapter = new OpenloginAdapter({
          adapterSettings: {
            network: "testnet",
            uxMode: "popup",
          },
        });

        web3authInstance.configureAdapter(adapter);
        await web3authInstance.initModal();
        setWeb3auth(web3authInstance);
      } catch (err) {
        console.error("Erro ao iniciar Web3Auth:", err);
      }
    };
    init();
  }, []);

  const handleWeb3AuthLogin = async () => {
    setError("");
    try {
      if (!web3auth) return;
      const provider = await web3auth.connect();
      const accounts = await (provider as any).request({ method: "eth_accounts" });
      const address = accounts[0];
      onLogin(address);
    } catch (err) {
      console.error("Erro ao fazer login com Web3Auth:", err);
      setError("❌ Erro ao conectar via Web3Auth");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        onLogin(data.token);
      } else {
        setError(data.message || "Erro na autenticação.");
      }
    } catch {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        {isRegister ? "Cadastro de Entregador" : "Login"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div>
            <label className="block text-sm">Nome:</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border rounded px-3 py-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        )}
        <div>
          <label className="block text-sm">Email:</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm">Senha:</label>
          <input
            type="password"
            name="password"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Enviando..." : isRegister ? "Cadastrar" : "Entrar"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      <hr className="my-4" />

      <button
        onClick={handleWeb3AuthLogin}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Entrar com Web3Auth (email ou carteira)
      </button>

      <button
        onClick={() => setIsRegister(!isRegister)}
        className="w-full text-blue-500 mt-3 underline"
      >
        {isRegister ? "Já tem conta? Faça login" : "Não tem conta? Cadastre-se"}
      </button>
    </div>
  );
};

export default Login;
