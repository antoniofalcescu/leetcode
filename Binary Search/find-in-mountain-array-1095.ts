// https://leetcode.com/problems/find-in-mountain-array/

// Hint:
// - MountainArray is basically formed of 2 arrays, left half being sorted in ascending order and right half being sorted in descending order

// TL;DR:
// Use a binary search to find the peak of the mountain array
// Use a binary search to find the target in the left and right parts of the mountain array
// Return the index of the target

// Complexities:
// Time => O(log(n)), where n is the length of the input array
// Space => O(1)

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *      get(index: number): number {}
 *
 *      length(): number {}
 * }
 */

function findInMountainArray(target: number, mountainArr: MountainArray) {
	const n = mountainArr.length();
	let [left, right] = [0, n - 1];
	let [peak, peakIdx] = [0, 0];
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		const midNum = mountainArr.get(mid);
		const nextMidNum = mountainArr.get(mid + 1);

		if (midNum > peak) {
			peak = midNum;
			peakIdx = mid;
		}

		if (midNum > nextMidNum) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	const leftIdx = binarySearch(mountainArr, target, 0, peakIdx, "ASC");
	if (leftIdx !== -1) {
		return leftIdx;
	}

	return binarySearch(mountainArr, target, peakIdx + 1, n - 1, "DESC");
}

function binarySearch(
	mountainArr: MountainArray,
	target: number,
	left: number,
	right: number,
	sorting: "ASC" | "DESC"
): number {
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		const midNum = mountainArr.get(mid);

		if (midNum === target) {
			return mid;
		}

		if (sorting === "ASC") {
			if (midNum > target) {
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		} else {
			if (midNum > target) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}
	}

	return -1;
}
