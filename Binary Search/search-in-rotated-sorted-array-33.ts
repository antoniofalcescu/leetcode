// https://leetcode.com/problems/search-in-rotated-sorted-array/

// TL;DR:
// Use a binary search approach:
//   - Check if the middle element is the target
//   - If not, check if the left half is sorted:
//     - If left half is sorted::
//         - And nums[left] <= nums[mid] < target -> search in the right half
//         - Otherwise -> search in the left half
//     - If left half is not sorted:
//         - And nums[right] <= target < nums[mid] < nums[left]  -> search in the left half
//         - Otherwise -> search in the right half

// Complexities:
// Time => O(log(n)), where n is the length of the array
// Space => O(1)

function search(nums: number[], target: number): number {
	let left = 0;
	let right = nums.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (nums[mid] === target) {
			return mid;
		}

		if (nums[mid] >= nums[left]) {
			if (nums[mid] < target || nums[left] > target) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		} else {
			if (nums[mid] > target || target > nums[right]) {
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		}
	}

	return -1;
}
