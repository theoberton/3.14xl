import { Cell, SendMode } from 'ton-core';

export type BaseTransactionArgs = {
	value: bigint | string;
	bounce?: boolean | null | undefined;
	sendMode?: SendMode;
	body?: Cell;
};
