// https://leetcode.com/problems/sort-an-array/

// TL;DR:
// Use a merge sort approach:
//   - Recursively split the array into two halves until we have single elements
//   - Merge the two halves back together in sorted order:
//     - Create two new arrays to store the left and right halves
//     - Iterate with 2 pointers through the two arrays and always take the smaller element to override the existing element in the original array
//     - After one of the arrays is exhausted, add the remaining elements of the other array to the original array
// Return the sorted array

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function mergeSort(nums: number[], left: number, right: number): number[] {
	if (left === right) {
		return nums;
	}

	const mid = Math.floor((left + right) / 2);
	mergeSort(nums, left, mid);
	mergeSort(nums, mid + 1, right);
	mergeArrays(nums, left, mid, right);

	return nums;
}

function mergeArrays(
	nums: number[],
	left: number,
	mid: number,
	right: number
): void {
	const leftHalf: number[] = [];
	for (let i = left; i <= mid; i++) {
		leftHalf.push(nums[i]);
	}
	const rightHalf: number[] = [];
	for (let i = mid + 1; i <= right; i++) {
		rightHalf.push(nums[i]);
	}

	let [i, j, k] = [left, 0, 0];
	while (j < leftHalf.length && k < rightHalf.length) {
		if (leftHalf[j] <= rightHalf[k]) {
			nums[i++] = leftHalf[j++];
		} else {
			nums[i++] = rightHalf[k++];
		}
	}
	while (j < leftHalf.length) {
		nums[i++] = leftHalf[j++];
	}
	while (k < rightHalf.length) {
		nums[i++] = rightHalf[k++];
	}
}

function sortArray(nums: number[]): number[] {
	return mergeSort(nums, 0, nums.length - 1);
}
