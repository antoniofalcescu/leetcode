// https://leetcode.com/problems/maximum-subarray/

// TL;DR:
// Use a greedy approach (Kadane's Algorithm)
//   - Initialize a sum variable to 0 and ans variable to -Infinity
//   - Iterate through the nums array and for each number:
//     - If the sum is less than 0, reset the sum to 0 (Greedy choice - current subarray is not helpful for future elements)
//     - Add the number to the sum
//     - Update the ans with the maximum of the current ans and the new sum

// Complexities:
// Time: O(n), where n is the length of the nums array
// Space: O(1)

function maxSubArray(nums: number[]): number {
	let sum = 0;
	let ans = -Infinity;
	for (const num of nums) {
		if (sum < 0) {
			sum = 0;
		}
		sum += num;
		ans = Math.max(ans, sum);
	}
	return ans;
}
