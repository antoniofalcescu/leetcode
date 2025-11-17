// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/

// TL;DR:
// Use a binary search approach:
//   - Keep track of a min value
//   - If the current [left, right] subarray is sorted, we can return the min(min, nums[left])
//   - Otherwise, we update the min value and check against the middle element:
//     - If middle is greater than or equal to left, we need to search in the right half
//     - If middle is less than left, we need to search in the left half

// Complexities:
// Time => O(log(n)), where n is the length of the array
// Space => O(1)

function findMin(nums: number[]): number {
	let left = 0;
	let right = nums.length - 1;
	let min = Infinity;

	while (left <= right) {
		if (nums[left] < nums[right]) {
			min = Math.min(min, nums[left]);
			break;
		}

		const mid = Math.floor((left + right) / 2);
		min = Math.min(min, nums[mid]);
		if (nums[mid] >= nums[left]) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return min;
}
