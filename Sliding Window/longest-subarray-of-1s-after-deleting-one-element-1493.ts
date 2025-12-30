// https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/

// TL;DR:
// We basically want to find the longest subarray of 1s with at most one 0
// Use a sliding window approach with left/right pointers and a zeroes counter
// For each right pointer num:
//   - If num is 0, increment the zeroes count
//   - While the zeroes count is greater than 1, increment the left pointer and decrement zeroes if nums[left] was 0
//   - Update the max length with max(maxLength, current window size)
// Return the max length - 1 (because we deleted one element)

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function longestSubarray(nums: number[]): number {
	let left = 0;
	let maxLength = 0;
	let zeroes = 0;
	for (let right = 0; right < nums.length; right++) {
		if (nums[right] === 0) {
			zeroes++;
		}
		while (zeroes > 1) {
			if (nums[left] === 0) {
				zeroes--;
			}
			left++;
		}
		maxLength = Math.max(maxLength, right - left + 1);
	}

	return maxLength - 1;
}
