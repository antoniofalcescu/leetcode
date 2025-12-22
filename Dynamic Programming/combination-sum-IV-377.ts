// https://leetcode.com/problems/combination-sum-iv/

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a DP array with the length of the target + 1, values = 0
//   - Set the last value of the DP array to 1 (base case)
//   - Iterate through the DP array backwards from target to 0 and for each sum:
//     - Iterate through the nums array and for each num:
//       - If sum + num is not out of bounds, update the sum DP value with the DP value of sum + num
//   - Return the first value of the DP array

// Complexities:
// Time => O(n * t), where n is the length of the nums array and t is the target
// Space => O(t), where t is the target

function combinationSum4(nums: number[], target: number): number {
	const dp = Array.from({ length: target + 1 }, () => 0);
	dp[target] = 1;
	for (let sum = target - 1; sum >= 0; sum--) {
		for (const num of nums) {
			if (sum + num <= target) {
				dp[sum] += dp[sum + num];
			}
		}
	}
	return dp[0];
}
