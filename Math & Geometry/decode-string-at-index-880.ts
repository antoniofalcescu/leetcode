// https://leetcode.com/problems/decode-string-at-index/

// Hint:
// - Since we can't naively calculate the string we need to think how to map the k to the maximum size of the string

// TL;DR:
// Since we can't naively calculate the string we need to think how to map the k to the maximum size of the string
// First, iterate through the string to calculate the maximum size of the string (increment for letters, multiply for digits)
// Then, iterate through the string backwards:
//   - Main trick is to encapsulate k inside the size (k %= size) and reversely reduce the size based on the characters in s (decrement for letters, divide for digits)
//   - Whenever we reach k === 0, the current character is the answer

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function decodeAtIndex(s: string, k: number): string {
	let size = 0;
	for (const c of s) {
		const numberC = Number(c);
		if (isNaN(numberC)) {
			size++;
		} else {
			size *= numberC;
		}
	}

	for (let i = s.length - 1; i >= 0; i--) {
		const c = s[i];
		const numberC = Number(c);

		k = k % size;
		if (isNaN(numberC)) {
			if (k === 0) {
				return c;
			}
			size--;
		} else {
			size = Math.round(size / numberC);
		}
	}

	return "";
}
