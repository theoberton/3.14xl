import { Cell } from "ton-core";
import { combineFunc } from "../../utils/combineFunc";
import { compile } from "@ton-community/blueprint";

export const NftItemSource = combineFunc(__dirname, [
  "../../contracts/stdlib.fc",
  "../../contracts/params.fc",
  "../../contracts/op-codes.fc",
  "../../contracts/nft-item.fc",
]);

export const NftItemCodeBoc =
  "te6cckECDQEAAdIAART/APSkE/S88sgLAQIBYgMCAAmhH5/gBQICzgcEAgEgBgUAHQDyMs/WM8WAc8WzMntVIAA7O1E0NM/+kAg10nCAJp/AfpA1DAQJBAj4DBwWW1tgAgEgCQgAET6RDBwuvLhTYALbDIhxwCSXwPg0NMDAXGwkl8D4PpA+kAx+gAxcdch+gAx+gAw8AIEs44UMGwiNFIyxwXy4ZUB+kDUMBAj8APgBtMf0z+CEF/MPRRSMLqOiTIQN14yQBPbPOAwNDQ1NYIQL8smohK64wJfBIQP8vCALCgBycIIQi3cXNQXIy/9QBM8WECSAQHCAEMjLBVAHzxZQBfoCFctqEssfyz8ibrOUWM8XAZEy4gHJAfsAAfZRNccF8uGR+kAh8AH6QNIAMfoAggr68IAboSGUUxWgod4i1wsBwwAgkgahkTbiIML/8uGSIY4+ghAFE42RyFAJzxZQC88WcSRJFFRGoHCAEMjLBVAHzxZQBfoCFctqEssfyz8ibrOUWM8XAZEy4gHJAfsAEEeUECo3W+IMAIICjjUm8AGCENUydtsQN0QAbXFwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7AJMwMjTiVQLwA7WWVRc=";

export const NftItemCodeCell = Cell.fromBoc(Buffer.from(NftItemCodeBoc, 'base64'))[0]