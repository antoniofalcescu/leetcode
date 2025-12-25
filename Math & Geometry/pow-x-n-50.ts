// https://leetcode.com/problems/powx-n/

// TL;DR:
// Use a recursive approach to split the exponent in halves:
//   - Edge case: if the base is 0, return 0
//   - Base case: if the exponent is 0, return 1
//   - Recursive case:
//     - If the exponent is negative, convert it to positive and convert the base number to 1 / base
//     - Calculate a leftover variable if the exponent is odd to base, otherwise it's 1
//     - Calculate the half = myPow(x, Math.trunc(n / 2))
//     - Return the leftover * half * half

// Complexities:
// Time => O(log n), where n is the input number
// Space => O(log n), where n is the input number

function myPow(x: number, n: number): number {
	if (x === 0) {
		return 0;
	}
	if (n === 0) {
		return 1;
	}
	if (n < 0) {
		n = Math.abs(n);
		x = 1 / x;
	}

	const leftover = n % 2 === 0 ? 1 : x;
	const half = myPow(x, Math.trunc(n / 2));
	return leftover * half * half;
}
