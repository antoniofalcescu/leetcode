// https://leetcode.com/problems/largest-merge-of-two-strings/

// Hint:
// - Think about how you can decide which side to take by looking ahead just enough to break the tie.

// TL;DR:
// Use 2 pointers (i1 and i2) to iterate through the two words and merge the words by comparing the characters at the current pointers
// If the characters are the same, compare the remaining characters of the words to find the larger character or the larger string length
// Return the merged word

// Complexities:
// Time => O(n + m), where n is the length of word1 and m is the length of word2
// Space => O(n + m)

function largestMerge(word1: string, word2: string): string {
	let merged = "";
	let [i1, i2] = [0, 0];
	while (i1 < word1.length && i2 < word2.length) {
		if (word1[i1] > word2[i2]) {
			merged += word1[i1];
			i1++;
		} else if (word2[i2] > word1[i1]) {
			merged += word2[i2];
			i2++;
		} else {
			let [c1, c2] = [i1, i2];
			while (
				c1 < word1.length &&
				c2 < word2.length &&
				word1[c1] === word2[c2]
			) {
				c1++;
				c2++;
			}

			if (word1[c1] > word2[c2] || c2 === word2.length) {
				merged += word1[i1];
				i1++;
			} else {
				merged += word2[i2];
				i2++;
			}
		}
	}

	return merged + word1.slice(i1) + word2.slice(i2);
}
