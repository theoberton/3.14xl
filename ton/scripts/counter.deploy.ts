import { toNano, Cell } from "ton-core";
import { Counter } from "../wrappers/Counter";
import { NetworkProvider } from "@ton-community/blueprint";
import { compile } from "../utils/compile";

export async function run(provider: NetworkProvider) {
  const counter = Counter.createFromConfig(
    {
      id: Math.floor(Math.random() * 10000),
      counter: 0,
    },
    await compile("contracts/counter.fc")
  );

  await provider.deploy(counter, toNano("0.05"));

  const openedContract = provider.open(counter);

  console.log("ID", await openedContract.getID());
}
