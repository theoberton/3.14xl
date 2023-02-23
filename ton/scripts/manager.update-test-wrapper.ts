import fs from "node:fs";

function main() {
  const inputFile = "./output/manager_NftManager.ts";
  const tactOutput = fs.readFileSync(inputFile);

  const system = tactOutput.toString().match(/__system = '(.*?)';/)?.[1];
  const code = tactOutput.toString().match(/__code = '(.*?)';/)?.[1];

  const outputFileName = "../frontend/src/wrappers/NftManager/NftManager.source.ts";
  const output = fs.readFileSync(outputFileName).toString();

  const modifiedOutput = output
    .replace(/const NftManagerCodeBoc = '.*';/, `const NftManagerCodeBoc = '${code}';`)
    .replace(/const NftManagerSystemBoc = '.*';/, `const NftManagerSystemBoc = '${system}';`);

  fs.writeFileSync(outputFileName, modifiedOutput);
}

main();
