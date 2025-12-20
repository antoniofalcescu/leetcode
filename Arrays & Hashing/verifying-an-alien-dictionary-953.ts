// https://leetcode.com/problems/verifying-an-alien-dictionary/

// TL;DR:
// Use a hash map to store the order of the characters in the alien dictionary
// Iterate through the words and for each pair of words:
//   - Iterate through the characters of the words:
//     - If we reached the end of the second word, but not the first, return false because they have the same prefix but the second word is shorter
//     - If the current character of the first word is less than the current character of the second word, break the loop
//     - If the current character of the first word is greater than the current character of the second word, return false
// Return true

// Complexities:
// Time => O(n * m), where n is the number of words and m is the length of the longest word
// Space => O(1), where we don't use any extra space

function isAlienSorted(words: string[], order: string): boolean {
	const orderMap: Record<string, number> = {};
	for (let i = 0; i < order.length; i++) {
		orderMap[order[i]] = i;
	}

	for (let i = 0; i < words.length - 1; i++) {
		const [w1, w2] = [words[i], words[i + 1]];
		for (let j = 0; j < w1.length; j++) {
			if (j === w2.length) {
				return false;
			}

			const [c1, c2] = [w1[j], w2[j]];
			if (orderMap[c1] < orderMap[c2]) {
				break;
			}
			if (orderMap[c1] > orderMap[c2]) {
				return false;
			}
		}
	}

	return true;
}
