// https://leetcode.com/problems/number-of-substrings-with-only-1s

// TL;DR:
// Keep track of the number of consecutive ones and iterate through the string:
//   - If the current character is a one, increment the count of consecutive ones and add the count of ones to the ans (modulo as per requirement)
//   - If the curent character is a zero, reset the count of consecutive ones
// Return the ans

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function numSub(s: string): number {
	const MODULO = Math.pow(10, 9) + 7;
	let consecutiveOnes = 0;
	let ans = 0;
	for (const c of s) {
		if (c === "1") {
			consecutiveOnes++;
			ans = (ans + consecutiveOnes) % MODULO;
		} else {
			consecutiveOnes = 0;
		}
	}

	return ans;
}
