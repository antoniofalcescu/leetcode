// https://leetcode.com/problems/search-insert-position/

// TL;DR:
// Use a binary search to find the index of the target in the sorted array
// If the target is found, return the index
// If the target is not found, return the index where it would be inserted (left pointer)

// Complexities:
// Time => O(log n), where n is the length of the input array
// Space => O(1)

function searchInsert(nums: number[], target: number): number {
	let [left, right] = [0, nums.length - 1];
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (nums[mid] === target) {
			return mid;
		}
		if (nums[mid] > target) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	return left;
}
