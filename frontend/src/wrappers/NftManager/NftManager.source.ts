/* Generated automatically from ton/scripts/manager.update-test-wrapper.ts */
import { Cell } from 'ton-core';

const NftManagerCodeBoc = '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';
const NftManagerSystemBoc = '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';

export const NftManagerCodeCell = Cell.fromBase64(NftManagerCodeBoc);
export const NftManagerSystemCell = Cell.fromBase64(NftManagerSystemBoc);
