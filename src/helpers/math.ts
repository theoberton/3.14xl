export function calcPercent(value: bigint, percent: number) {
	return BigInt(Math.floor(Number(value) * percent));
}
