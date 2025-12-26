// https://leetcode.com/problems/bitwise-and-of-number-range/

// TL;DR:
// Trick is that the result is the common prefix of the two numbers
// Loop until the two numbers are equal:
//   - Shift both numbers right by 1 bit
//   - Increment the number of shifts
// Return the left number shifted left by the number of shifts

// Complexities:
// Time => O(log(n)), where n is the difference between left and right
// Space => O(1)

function rangeBitwiseAnd(left: number, right: number): number {
	let shifts = 0;
	while (left !== right) {
		left >>= 1;
		right >>= 1;
		shifts++;
	}

	return left << shifts;
}
