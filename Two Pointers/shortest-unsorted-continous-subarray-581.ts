// https://leetcode.com/problems/shortest-unsorted-continous-subarray/

// TL;DR:
// Find 2 pointers:
// - The rightest pointer from left to right where the current number is < max found so far
// - The leftest pointer from right to left where the current number is > min found so far
// Return the length of the subarray (right - left + 1), handle edge cases of already sorted array

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function findUnsortedSubarray(nums: number[]): number {
	let [min, max] = [Infinity, -Infinity];
	let [left, right] = [0, 0];
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] >= max) {
			max = nums[i];
		} else {
			right = i;
		}
	}
	for (let i = nums.length - 1; i >= 0; i--) {
		if (nums[i] <= min) {
			min = nums[i];
		} else {
			left = i;
		}
	}

	if (right === 0) {
		return 0;
	}

	return right - left + 1;
}
