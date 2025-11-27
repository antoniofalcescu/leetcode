// https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k/

// Hint:
// - Use a remainderToPrefix hash map to store minimum prefix updating it while iterating through the array

// TL;DR:
// Use a hash map to store the minimum prefix sum for each remainder (0 to k - 1)
// Iterate through the nums array and:
//   - Add the current number to the sum
//   - Calculate the remainder for the current length
//   - Update the maximum sum with the current sum - min prefix found so far for the current remainder
//   - Update the min prefix for the current remainder

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(k), where k is the input number

function maxSubarraySum(nums: number[], k: number): number {
	const remainderToPrefix: Record<number, number> = {};
	for (let i = 0; i < k; i++) {
		remainderToPrefix[i] = Infinity;
	}
	remainderToPrefix[0] = 0;

	let maxSum = -Infinity;
	let sum = 0;
	for (let i = 0; i < nums.length; i++) {
		sum += nums[i];
		const currRemainder = (i + 1) % k;
		maxSum = Math.max(maxSum, sum - remainderToPrefix[currRemainder]);
		remainderToPrefix[currRemainder] = Math.min(
			remainderToPrefix[currRemainder],
			sum
		);
	}

	return maxSum;
}
