export function getConsonants(word: string): string {
	let vowels = ['a', 'e', 'i', 'o', 'u'];
	vowels = [...vowels, ...vowels.map(v => v.toUpperCase())];

	const letters = word.split('');

	return letters.filter(letter => vowels.indexOf(letter) < 0).join('');
}
