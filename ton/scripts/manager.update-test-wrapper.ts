import fs from "node:fs";

function main() {
  const inputFile = "./ton/output/manager_NftManager.ts";
  const tactOutput = fs.readFileSync(inputFile);

  const system = tactOutput.toString().match(/const __system = Cell\.fromBase64\('(.*?)'\);/)?.[1];
  const code = tactOutput.toString().match(/const __code = Cell\.fromBase64\('(.*?)'\);/)?.[1];

  const outputFileName = "./frontend/src/wrappers/NftManager/NftManager.source.ts";
  const output = fs.readFileSync(outputFileName).toString();

  const modifiedOutput = output
    .replace(/const NftManagerCodeBoc = '.*';/, `const NftManagerCodeBoc = '${code}';`)
    .replace(/const NftManagerSystemBoc = '.*';/, `const NftManagerSystemBoc = '${system}';`);

  fs.writeFileSync(outputFileName, modifiedOutput);
}

main();
