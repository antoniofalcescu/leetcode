// https://leetcode.com/problems/missing-number/

// TL;DR:
// Use XOR property of a ^ b ^ a = b to find the missing number
// Since we have all numbers in [0, n] except one and the array length is 0-indexed up until n:
//   - Initialize a XOR variable with n
//   - Iterate through the array and XOR the current XOR value with the current index and the current number
// Return the XOR value

// Complexities:
// Time => O(n), where n is the number of elements in the array
// Space => O(1)

function missingNumber(nums: number[]): number {
	const n = nums.length;
	let xor = n;
	for (let i = 0; i < n; i++) {
		xor ^= i ^ nums[i];
	}

	return xor;
}
