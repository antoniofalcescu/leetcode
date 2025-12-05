// https://leetcode.com/problems/orderly-queue/

// Hint:
// - Draw examples for k=1 and k>1

// TL;DR:
// If k > 1, we can do any permutation of the string, therefore the smallest one will be the sorted string
// If k = 1, we need to find the lexicographically smallest string by rotating the string and checking if it's smaller than the current minimum (just for loop through the string)
// Return the minimum string

// Complexities:
// Time => O(n^2), where n is the length of the input string when k = 1, O(n * log(n)) when k > 1
// Space => O(n), where n is the length of the input string

function orderlyQueue(s: string, k: number): string {
	if (k > 1) {
		return [...s].sort().join("");
	}

	let min = s;
	for (let i = 0; i < s.length; i++) {
		s = s.slice(1) + s[0];
		if (s < min) {
			min = s;
		}
	}

	return min;
}
