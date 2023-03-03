export function fromUnixToDate(time?: number) {
	const dateStart = new Date((time ?? 0) * 1000);

	return dateStart;
}
