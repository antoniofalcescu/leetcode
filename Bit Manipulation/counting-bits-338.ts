// https://leetcode.com/problems/counting-bits/

// TL;DR:
// Use a DP array to store the number of 1s in the binary representation of the number
// Keep track of an offset that represents the largest power of 2 less than or equal to the current number (MSB = 1 of the current number)
// Iterate through the array and for each number:
//   - If the current number is a power of 2, update the offset to the number
//   - The current number of 1s is 1 + the DP value of the current number - the offset
// Return the DP array

// Complexities:
// Time => O(n), where n is the input number
// Space => O(n), where n is the input number

function countBits(n: number): number[] {
	const dp = Array.from({ length: n + 1 }, () => 0);
	let offset = 1;
	for (let i = 1; i <= n; i++) {
		if (offset * 2 === i) {
			offset = i;
		}
		dp[i] = 1 + dp[i - offset];
	}
	return dp;
}
