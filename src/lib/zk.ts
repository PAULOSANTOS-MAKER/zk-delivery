import * as circomlib from 'circomlibjs'
import { groth16 } from 'snarkjs'
import fs from 'fs'
import path from 'path'

export async function gerarHashPoseidon(code: string): Promise<string> {
  const poseidon = await circomlib.buildPoseidon()
  const hashBigInt = poseidon([BigInt(code)])
  return poseidon.F.toString(hashBigInt)
}

export async function gerarProva(code: string, hashCode: string) {
  const input = {
    code: code.toString(),
    hashCode: hashCode.toString()
  }

  const wasmPath = path.resolve(__dirname, '../contracts/circuits/build/verify_code_js/verify_code.wasm')
  const zkeyPath = path.resolve(__dirname, '../contracts/circuits/build/verify_code_final.zkey')

  const { proof, publicSignals } = await groth16.fullProve(
    input,
    wasmPath,
    zkeyPath
  )

  return { proof, publicSignals }
}
