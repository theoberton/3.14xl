import { Address, beginCell, Cell, Contract } from 'ton-core';

export class BaseLocalContract implements Contract {
	constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

	static createStateInit(
		code: Cell,
		data: Cell,
		library = null,
		splitDepth = null,
		ticktock = null
	): Cell {
		if (library) throw 'Library in state init is not implemented';
		if (splitDepth) throw 'Split depth in state init is not implemented';
		if (ticktock) throw 'Ticktock in state init is not implemented';

		const stateInit = beginCell();

		stateInit.storeBit(Boolean(splitDepth));
		stateInit.storeBit(Boolean(ticktock));
		stateInit.storeBit(Boolean(code));
		stateInit.storeBit(Boolean(data));
		stateInit.storeBit(Boolean(library));

		if (code) stateInit.storeRef(code);
		if (data) stateInit.storeRef(data);
		if (library) stateInit.storeRef(library);

		return stateInit.endCell();
	}

	/**
	 * @protected
	 * @return {Promise<Cell>}
	 */
	createStateInit() {
		if (!this.init) {
			throw new Error('Cannon return state init');
		}
		const codeCell = this.init.code;
		const dataCell = this.init.data;

		const stateInit = BaseLocalContract.createStateInit(codeCell, dataCell);

		return stateInit;
	}

	createStateInitAsBase64() {
		const stateInit = this.createStateInit();

		return stateInit.toBoc().toString('base64');
	}
}
