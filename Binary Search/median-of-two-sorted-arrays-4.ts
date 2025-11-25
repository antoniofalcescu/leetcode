// https://leetcode.com/problems/median-of-two-sorted-arrays/

// TL;DR:
// Use a binary search approach to find the median:
//   - The median is defined as:
//     - The middle element of a sorted arrays if the total number of elements is odd
//     - The average of the two middle elements if the total number of elements is even
// We want to run Binary Search on the smaller array:
//   - First, get the total length of the two arrays and the half length (half + 1 to handle odd total length case)
//   - Run Binary Search on the smaller array:
//     - Calculate the mid index of the smaller array and the corresponding index in the larger array
//     - Both indices will represent the first index after the left partition cut
//     - Caclulate the last element of left partition and first element of right partition for both arrays
//     - Compare the left of each array with the right of the other array and vice versa
//         - If both lefts <= rights, the partitioning is correct and we can return the median according to the total length
//         - If the left of our main smaller array is > right of the other array, the partition for the small array is too big and we need to shrink right pointer
//         - If the right of our main smaller array is < left of the other array, the partition for the small array is too small and we need to increase left pointer (so that next midIdx will have more elements)

// Complexities:
// Time => O(log(min(m, n))), where m and n are the lengths of the two arrays
// Space => O(1)

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
	const total = nums1.length + nums2.length;
	const half = Math.floor((total + 1) / 2);

	if (nums1.length > nums2.length) {
		return findMedianSortedArrays(nums2, nums1);
	}

	let [left, right] = [0, nums1.length];
	while (left <= right) {
		const midIdx = Math.floor((left + right) / 2);
		const otherArrayIdx = half - midIdx;

		const nums1Left = midIdx > 0 ? nums1[midIdx - 1] : -Infinity;
		const nums1Right = midIdx < nums1.length ? nums1[midIdx] : Infinity;
		const nums2Left = otherArrayIdx > 0 ? nums2[otherArrayIdx - 1] : -Infinity;
		const nums2Right =
			otherArrayIdx < nums2.length ? nums2[otherArrayIdx] : Infinity;

		if (nums1Left <= nums2Right && nums2Left <= nums1Right) {
			if (total % 2 === 0) {
				return (
					(Math.max(nums1Left, nums2Left) + Math.min(nums1Right, nums2Right)) /
					2
				);
			}
			return Math.max(nums1Left, nums2Left);
		} else if (nums1Left > nums2Right) {
			right = midIdx - 1;
		} else {
			left = midIdx + 1;
		}
	}

	return -1;
}
