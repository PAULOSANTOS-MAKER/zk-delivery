const circomlib = require('circomlibjs');
const fs = require('fs');

(async () => {
  const poseidon = await circomlib.buildPoseidon();
  const code = BigInt(123456);
  const hash = poseidon.F.toString(poseidon([code]));

  console.log("Hash Poseidon:", hash);

  // Gera o input.json automaticamente
  const input = {
    code: "123456",
    codeHash: hash
  };
  fs.writeFileSync("input.json", JSON.stringify(input, null, 2));
})();

