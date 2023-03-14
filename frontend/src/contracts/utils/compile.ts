import { compileContract } from "ton-compiler";
import { Cell } from "ton-core";

export async function compile(file: string): Promise<Cell> {
  let result = await compileContract({ files: [file], stdlib: true, version: "latest" });

  if (result.ok) {
    return Cell.fromBoc(result.output)[0];
  } else {
    throw result.log;
  }
}
