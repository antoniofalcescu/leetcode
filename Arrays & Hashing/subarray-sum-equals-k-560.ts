// https://leetcode.com/problems/subarray-sum-equals-k/

// Hint:
// - Think of what data structure & pattern we need so that we can fetch how many occurences of a needed value appeared before the current number in O(1) time

// TL;DR:
// Use a prefix sum hash map to store the sum and the number of times it appears (0: 1 first)
// Iterate through the nums array and:
//   - Add the current number to the ongoing prefix sum
//   - Calculate the needed sum to reach k and add the number of times the needed sum appears to the answer
//   - Increment the prefix sum hash map for the current sum key

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function subarraySum(nums: number[], k: number): number {
	const prefixSum = { 0: 1 };

	let ans = 0;
	let sum = 0;
	for (const num of nums) {
		sum += num;
		const needed = sum - k;
		ans += prefixSum[needed] ?? 0;

		prefixSum[sum] = (prefixSum[sum] ?? 0) + 1;
	}

	return ans;
}
