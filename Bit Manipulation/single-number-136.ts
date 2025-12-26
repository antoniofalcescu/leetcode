// https://leetcode.com/problems/single-number/

// TL;DR:
// Use a XOR operation to find the single number (a ^ b ^ b = a)
//   - XOR all the numbers in the array, all duplicates will cancel out and we'll be left with the single number
// Return the single number

// Complexities:
// Time => O(n), where n is the number of elements in the array
// Space => O(1)

function singleNumber(nums: number[]): number {
	let xor = 0;
	for (const num of nums) {
		xor ^= num;
	}
	return xor;
}
