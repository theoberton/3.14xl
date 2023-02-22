import { Cell, beginCell } from "ton-core";

const OFF_CHAIN_CONTENT_PREFIX = 0x01;

export function flattenSnakeCell(cell: Cell) {
  let c: Cell | null = cell;

  let res = Buffer.alloc(0);

  while (c) {
    let cs = c.beginParse();

    let data = cs.loadBuffer(cs.remainingBits / 8);
    res = Buffer.concat([res, data]);
    c = c.refs[0];
  }

  return res;
}

function bufferToChunks(buff: Buffer, chunkSize: number) {
  let chunks: Buffer[] = [];
  while (buff.byteLength > 0) {
    chunks.push(buff.slice(0, chunkSize));
    buff = buff.slice(chunkSize);
  }
  return chunks;
}

export function makeSnakeCell(data: Buffer) {
  let chunks = bufferToChunks(data, 127);
  let rootCell = beginCell();
  let curCell = rootCell;

  for (let i = 0; i < chunks.length; i++) {
    let chunk = chunks[i];

    curCell.storeBuffer(chunk);

    if (chunks[i + 1]) {
      let nextCell = beginCell();
      curCell.storeRef(nextCell);
      curCell = nextCell;
    }
  }

  return rootCell.endCell();
}

export function encodeOffChainContent(content: string) {
  let data = Buffer.from(content);
  let offChainPrefix = Buffer.from([OFF_CHAIN_CONTENT_PREFIX]);
  data = Buffer.concat([offChainPrefix, data]);
  return makeSnakeCell(data);
}

export function decodeOffChainContent(content: Cell): string {
  let data = flattenSnakeCell(content);

  let prefix = data[0];
  if (prefix !== OFF_CHAIN_CONTENT_PREFIX) {
    throw new Error(`Unknown content prefix: ${prefix.toString(16)}`);
  }
  return data.slice(1).toString();
}
