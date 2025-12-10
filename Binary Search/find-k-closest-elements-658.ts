// https://leetcode.com/problems/find-k-closest-elements/

// Hint:
// - Find the closest element index and expand until you get all k elements in a subarray

// TL;DR:
// Use a binary search to find the closest element to x
// Then, use two left-right pointers starting near the previously found closest and expand according to which number is closer
// Return the subarray starting from left + 1 and ending at right

// Complexities:
// Time => O(log(n) + k), where n is the length of the input array
// Space => O(1)

function findClosestElements(arr: number[], k: number, x: number): number[] {
	let [left, right] = [0, arr.length - 1];
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		if (arr[mid] < x) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	[left, right] = [left - 1, left];
	while (right - left - 1 < k) {
		if (left < 0) {
			right++;
		} else if (right >= arr.length) {
			left--;
		} else {
			const leftDiff = Math.abs(arr[left] - x);
			const rightDiff = Math.abs(arr[right] - x);
			if (leftDiff <= rightDiff) {
				left--;
			} else {
				right++;
			}
		}
	}

	return arr.slice(left + 1, right);
}
