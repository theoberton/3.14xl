import { isSameSecond, isAfter, isBefore } from 'date-fns';

export function dateToUnix(date: Date) {
	return Math.floor(Number(date) / 1000);
}

export function unixToDate(date: number) {
	return new Date((date ?? 0) * 1000);
}

export function isMintAllowed(now: Date, start?: number, end?: number) {
	return (!start || new Date(start * 1000) < now) && (!end || now < new Date(end * 1000));
}
