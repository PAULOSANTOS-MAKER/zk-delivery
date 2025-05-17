const circomlibjs = require("circomlibjs");

async function main() {
    try {
        // Initialize Poseidon hash
        const poseidon = await circomlibjs.buildPoseidon();
        const code = 123456;
        const hash = poseidon([code]);
        const hashStr = poseidon.F.toString(hash);
        console.log("codeHash:", hashStr);
        // Compare with provided hash
        const expectedHash = "3607056778794995795434385085847334626017449707154072104308864676240828390282";
        console.log("Matches expected hash:", hashStr === expectedHash);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
