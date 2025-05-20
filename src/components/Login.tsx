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
            chainId: "0x1",
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
        console.error("Erro ao inicializar Web3Auth:", err);
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
      console.log("Endereço:", address);
      onLogin(address);
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("❌ Falha ao conectar com a carteira.");
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
        setError(data.message || "Erro na autenticação");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? "Cadastro de Entregador" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {isRegister && (
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Seu email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Sua senha"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : isRegister ? "Cadastrar" : "Entrar"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <hr />
      <button onClick={handleWeb3AuthLogin}>
        Entrar com Web3Auth (e-mail ou carteira)
      </button>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Já tem conta? Faça login" : "Não tem conta? Cadastre-se"}
      </button>
    </div>
  );
};

export default Login;
