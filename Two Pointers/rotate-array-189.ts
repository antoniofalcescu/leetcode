// https://leetcode.com/problems/rotate-array/

// Hint:
// - For O(1) space solution, draw the revesed array and see the pattern related to k elements

// TL;DR:
// For O(1) space solution, the trick is to reverse the full array once, then reverse each k/n - k parts
// Use a helper function to reverse the array in place

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

/**
 Do not return anything, modify nums in-place instead.
 */
function reverse(nums: number[], left: number, right: number): void {
	while (left < right) {
		[nums[left], nums[right]] = [nums[right], nums[left]];
		left++;
		right--;
	}
}

function rotate(nums: number[], k: number): void {
	const n = nums.length;
	k = k % n;
	reverse(nums, 0, n - 1);
	reverse(nums, 0, k - 1);
	reverse(nums, k, n - 1);
}
