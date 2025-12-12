// https://leetcode.com/problems/search-in-rotated-sorted-array-ii/

// Hint:
// - Similar to Search in Rotated Sorted Array problem, but with duplicates which can be handled manually less efficiently

// TL;DR:
// Similar to Search in Rotated Sorted Array problem, we can use a binary search to find the target in the rotated sorted array
// The only difference here is for [2, 2, 2, 2, 3, 1, 2, 2] kind of arrays, we don't know in which half to go if we're in the middle, therefore we need to just increment the left pointer

// Complexities:
// Time => O(log(n)) average case, O(n) worst case, where n is the length of the input array
// Space => O(1)

function search2(nums: number[], target: number): boolean {
	let [left, right] = [0, nums.length - 1];
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (nums[mid] === target) {
			return true;
		}

		if (nums[mid] === nums[left]) {
			left++;
		} else if (nums[mid] > nums[left]) {
			if (target > nums[mid] || nums[left] > target) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		} else {
			if (target < nums[mid] || target > nums[right]) {
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		}
	}

	return false;
}
