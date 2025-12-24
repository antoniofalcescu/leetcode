// https://leetcode.com/problems/maximum-sum-circular-subarray/

// TL;DR:
// Use greedy Kadane's Algorithm similar to LC. 53 Maximum Subarray
// Difference is that we can have a subarray that start at the end and wraps to the beginning as the maximum:
//    - To calculate this, we can do Kadane's Algorithm for the minimum subarray sum in the middle and compare it to the Kadane's Algorithm for the maximum subarray sum
// Initialize 2 sets of variables and a total helper sum variable:
//    - currMax and max for the maximum subarray sum
//    - currMin and min for the minimum subarray sum
// Iterate through the nums array:
//    - Update the currMax with the maximum of the currMax plus the current number and the current number (if it's better to use or ignore the previous subarray)
//    - Update the max with the maximum of the max and the currMax
//    - Update the currMin with the minimum of the currMin plus the current number and the current number (if it's better to use or ignore the previous subarray)
//    - Update the min with the minimum of the min and the currMin
//    - Add the current number to the total
// After the iteration, if the max is less than 0, return the max (edge case - all numbers are negative)
// Otherwise, return the maximum of the max and the total minus the min (wrap around case)

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function maxSubarraySumCircular(nums: number[]): number {
	let [currMax, max] = [0, -Infinity];
	let [currMin, min] = [0, Infinity];
	let total = 0;
	for (const num of nums) {
		currMax = Math.max(currMax + num, num);
		max = Math.max(max, currMax);
		currMin = Math.min(currMin + num, num);
		min = Math.min(min, currMin);
		total += num;
	}

	if (max < 0) {
		return max;
	}

	return Math.max(max, total - min);
}
