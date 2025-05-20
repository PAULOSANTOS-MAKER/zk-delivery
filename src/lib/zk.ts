// frontend/src/lib/zk.ts
import { groth16 } from "snarkjs";

export async function gerarProvaZK(codigo: string) {
  const input = {
    codigo_secreto: codigo,
  };

  const { proof, publicSignals } = await groth16.fullProve(
    input,
    "/verify_code.wasm",
    "/verify_code_final.zkey"
  );

  return { proof, publicSignals };
}
