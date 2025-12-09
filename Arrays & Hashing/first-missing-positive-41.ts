// https://leetcode.com/problems/first-missing-positive/

// Hint:
// - The smallest positive that is missing is always in the range [1, n + 1], think on how to use the existing array with this constraint to check if a number is present or not

// TL;DR:
// We'll use the existing array as a hash set to tell if a number is present or not by marking the 0 based index of each number as negative
// This works because the smallest positive that is missing is always in the range [1, n + 1]
// First loop, iterate through the array and set all negative numbers and zeroes to Infinity (they are useless and disturb the negative marking logic)
// Second loop, iterate through the array:
//   - For each number, get the absolute value and the index (idx = abs(num) - 1)
//   - If the number at the index is in bounds, mark it as negative
// Third loop, iterate through the indices from 0 to n and return the first index + 1 that is not marked as negative
// If we don't find any, return n + 1 (worst case)

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function firstMissingPositive(nums: number[]): number {
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] <= 0) {
			nums[i] = Infinity;
		}
	}

	for (const num of nums) {
		const abs = Math.abs(num);
		const idx = abs - 1;

		if (nums[idx]) {
			nums[idx] = Math.abs(nums[idx]) * -1;
		}
	}

	for (let i = 0; i < nums.length; i++) {
		if (nums[i] > 0) {
			return i + 1;
		}
	}

	return nums.length + 1;
}
