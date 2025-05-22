# 🚚 ZK Delivery – Entrega Segura com Blockchain + ZK

O ZK Delivery é uma aplicação Web3 onde clientes podem cadastrar pedidos de entrega com privacidade, e entregadores acessam os dados **somente com um código secreto validado por prova ZK (Zero-Knowledge)**.

---

## 🔐 Tecnologias Utilizadas

- Next.js 15 + TypeScript
- Web3Auth (login via e-mail)
- zkSync Sepolia (blockchain)
- Smart contract Solidity
- TailwindCSS
- zk-SNARKs (snarkjs + circomlibjs)

---

## ⚙️ Como Funciona

### Cliente:
- Faz login via e-mail com Web3Auth
- Cadastra um pedido com dados como peso, tamanho e endereço
- Recebe um código secreto para envio ao entregador

### Entregador:
- Insere o código secreto no site
- Visualiza os dados da retirada e entrega
- Retira e entrega o pacote sem saber quem é o cliente

---

## 🚀 Deploy

🔗 Projeto ao vivo: [https://zk-delivery.vercel.app](https://zk-delivery.vercel.app)

---

## 📁 Estrutura do Projeto

```
frontend/
├── pages/              # Rotas do Next.js
├── components/         # Componentes reutilizáveis
├── lib/                # Hooks e lógica de ZK
├── contracts/          # Circuitos e contrato Solidity
├── public/             # Imagens e arquivos estáticos
├── styles/             # Estilização global
├── .env.example        # Modelo de variáveis de ambiente
```

---

## 📦 Variáveis de Ambiente

Crie um arquivo `.env` na raiz de `frontend/` com:

```env
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=SEU_CLIENT_ID
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=CHAVE_GOOGLE_MAPS (opcional)
NEXT_PUBLIC_ZK_CONTRACT=ENDEREÇO_DO_CONTRATO
```

> ⚠️ Nunca suba o `.env` no GitHub – ele já está protegido pelo `.gitignore`.

---

## 🧪 Como Rodar Localmente

```bash
git clone https://github.com/PAULOSANTOS-MAKER/zk-delivery.git
cd zk-delivery/frontend
cp .env.example .env
# edite com suas chaves reais
npm install
npm run dev
```

Acesse em [http://localhost:3000](http://localhost:3000)

---

## 📡 Contrato Inteligente

Contrato Solidity implantado na zkSync Sepolia:

```
Endereço: 0x8f25a7C67a38271DC71eF7Be13564e1E3ae5f719
Rede: zkSync Sepolia Testnet
```

---

## 🔐 Segurança

- `.env` protegido e fora do Git
- Chave do Google com restrição de domínio e API
- Login via Web3Auth seguro
- Verificação com provas ZK (Groth16)

---

## 🧠 Futuras Melhorias

- Cálculo automático de frete por distância (Google Maps)
- QR code de retirada
- Locker descentralizado com ZK proof
- Entregas com drones e rastreamento real-time
- Registro imutável de entregas via blockchain

---

## 👨‍💻 Autor

Feito por **Paulo Santos**  
🔗 [github.com/PAULOSANTOS-MAKER](https://github.com/PAULOSANTOS-MAKER)
