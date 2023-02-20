import { CompilerConfig } from "@ton-community/blueprint";

export const compile: CompilerConfig = {
  targets: [
    "contracts/nft-collection.fc",
    "contracts/op-codes.fc",
    "contracts/params.fc",
    "contracts/stdlib.fc",
  ],
};
