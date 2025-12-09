// https://leetcode.com/problems/merge-strings-alternately/

// Hint:
// Just 2 pointers parallel iteration through both words

// TL;DR:
// Use two pointers to iterate through the two words in parallel
// If we reach the end of one of the words, add the remaining characters of the other word to the answer
// Return the answer

// Complexities:
// Time => O(n), where n is the length of the larger word
// Space => O(1)

function mergeAlternately(word1: string, word2: string): string {
	let ans = "";
	let [i, j] = [0, 0];
	while (i < word1.length && j < word2.length) {
		ans += word1[i] + word2[j];
		i++;
		j++;
	}
	while (i < word1.length) {
		ans += word1[i];
		i++;
	}
	while (j < word2.length) {
		ans += word2[j];
		j++;
	}

	return ans;
}
