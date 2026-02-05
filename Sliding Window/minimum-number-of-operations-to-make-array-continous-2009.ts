// https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continous/

// TL;DR:
// Remove duplicates and sort the array
// Use a sliding window approach through the sorted filtered array to find the longest possible subarray with as many existing numbers as possible:
//   - The invariant is for the max (right position) - min (left position) to be less than the length of the original array
//   - If the invariant is broken, increment the left pointer
//   - If not, update the maxExisting variable with max(maxExisting, right - left + 1)
// Return the length of the array minus the maxExisting variable

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function minOperations(nums: number[]): number {
	const uniqueNums = [...new Set<number>(nums)].sort((a, b) => a - b);

	let left = 0;
	let maxExisting = 0;
	for (let right = 0; right < uniqueNums.length; right++) {
		while (uniqueNums[right] - uniqueNums[left] >= nums.length) {
			left++;
		}

		maxExisting = Math.max(maxExisting, right - left + 1);
	}

	return nums.length - maxExisting;
}
