import fs from "node:fs";

function main() {
  const inputFile = "./output/manager_NftManager.ts";
  const tactOutput = fs.readFileSync(inputFile);

  const system = tactOutput.toString().match(/__system = '(.*?)';/)?.[1];
  const code = tactOutput.toString().match(/__code = '(.*?)';/)?.[1];

  const outputFileName = "./../wrappers/NftManager";
  const output = fs.readFileSync(outputFileName).toString();

  const modifiedOutput = output
    .replace(/static readonly code = Cell\.fromBase64\('.*'\);/, `static readonly code = Cell.fromBase64('${code}');`)
    .replace(
      /static readonly system = Cell\.fromBase64\('.*'\);/,
      `static readonly system = Cell.fromBase64('${system}');`
    );

  fs.writeFileSync(outputFileName, modifiedOutput);

  // @todo: Also need to update frontend/src/pages/CreateEditionOld/pixel_NFTManager.ts
}

main();
