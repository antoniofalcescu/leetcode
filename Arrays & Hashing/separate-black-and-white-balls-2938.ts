// https://leetcode.com/problems/separate-black-and-white-balls/

// TL;DR:
// Use a greedy approach
// Iterate through the string from the end and count the number of zeroes
// If we find a 1, add the number of zeroes to the swaps
// Return the swaps

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function minimumSteps(s: string): number {
	let zeroes = 0;
	let swaps = 0;
	for (let i = s.length - 1; i >= 0; i--) {
		if (s[i] === "0") {
			zeroes++;
		} else {
			swaps += zeroes;
		}
	}

	return swaps;
}
