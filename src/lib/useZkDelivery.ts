import { abi } from "./zkDeliveryAbi";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x20655f2779aBa19981d5A5205e76B392e34aa9f7";

export function useZkDelivery() {
  const cadastrarPedido = async (
    retirada: string,
    entrega: string,
    peso: string,
    tamanho: string,
    hash: number
  ) => {
    if (!window.ethereum) throw new Error("Wallet não conectada");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contrato = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    const tx = await contrato.cadastrarPedido(retirada, entrega, peso, tamanho, hash);
    await tx.wait();
    return tx;
  };

  const verificarEntrega = async (
    a: [bigint, bigint],
    b: [[bigint, bigint], [bigint, bigint]],
    c: [bigint, bigint],
    input: [bigint]
  ) => {
    if (!window.ethereum) throw new Error("Wallet não conectada");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contrato = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    const tx = await contrato.verificarEntrega(a, b, c, input);
    await tx.wait();
    return tx;
  };

  return { cadastrarPedido, verificarEntrega };
}
