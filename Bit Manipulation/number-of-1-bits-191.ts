// https://leetcode.com/problems/number-of-1-bits/

// TL;DR:
// Keep track of the ones in a separate variable initialized to 0
// Iterate until n becomes 0:
//   - n becomes the result of n & n - 1 (this will remove the rightmost 1 bit from n)
//   - Increment ones by 1
// Return the ones

// Complexities:
// Time => O(number of ones bits) = O(32) worst case = O(1)
// Space => O(1)

function hammingWeight(n: number): number {
	let ones = 0;
	while (n !== 0) {
		n &= n - 1;
		ones++;
	}
	return ones;
}
