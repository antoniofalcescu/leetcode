// https://leetcode.com/problems/sum-of-two-integers/

// TL;DR:
// We'll use 2 bitwise operations to get the sum without using the + operator:
//   - XORring 2 numbers will give us the sum of the numbers without carrying over
//   - ANDing 2 numbers will give us the carry and shifting it left by 1 will put the carry in the correct position
// Loop until b becomes 0:
//   - Update a to the result of a XOR b
//   - Update b to the result of (a AND b) shifted left by 1
// Return the final value of a

// Complexities:
// Time => O(1)
// Space => O(1)

function getSum(a: number, b: number): number {
	while (b !== 0) {
		[a, b] = [a ^ b, (a & b) << 1];
	}
	return a;
}
