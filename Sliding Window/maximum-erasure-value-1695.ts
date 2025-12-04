// https://leetcode.com/problems/maximum-erasure-value/

// Hint:
// - Just find the maximum sum of a unique subarray

// TL;DR:
// Use 2 pointers (left and right) to iterate through the array and use a set to store the unique numbers in the current window
// For each right pointer num:
//   - While the current number is in the set, remove the leftmost number from the set, subtract it from the sum and increment the left pointer
//   - Add the current number to the sum and the set
//   - Update the max sum with max(maxSum, sum)
// Return the max sum

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function maximumUniqueSubarray(nums: number[]): number {
	const uniques = new Set<number>();
	let maxSum = 0;
	let sum = 0;

	let left = 0;
	for (let right = 0; right < nums.length; right++) {
		while (uniques.has(nums[right])) {
			sum -= nums[left];
			uniques.delete(nums[left]);
			left++;
		}

		sum += nums[right];
		uniques.add(nums[right]);
		maxSum = Math.max(maxSum, sum);
	}

	return maxSum;
}
