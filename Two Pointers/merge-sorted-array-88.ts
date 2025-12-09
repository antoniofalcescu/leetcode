// https://leetcode.com/problems/merge-sorted-array/

// Hint:
// - Think on how to sort in place without overwriting the existing elements

// TL;DR:
// Use two pointers to iterate through the two arrays in parallel
// The iteration and merging will happen from the end to the beginning to not overwrite the existing elements in nums1
//    - Therefore we want to take the larger element each time and put it at the end index in nums1
// After one of the arrays is exhausted, add the remaining elements of the nums2 array to the end of nums1

// Complexities:
// Time => O(n), where n is the length of the larger array
// Space => O(1)

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
	let [i, j, k] = [nums1.length - 1, m - 1, n - 1];

	while (j >= 0 && k >= 0) {
		if (nums1[j] < nums2[k]) {
			nums1[i] = nums2[k];
			k--;
		} else {
			nums1[i] = nums1[j];
			j--;
		}
		i--;
	}
	while (k >= 0) {
		nums1[i] = nums2[k];
		i--;
		k--;
	}
}
