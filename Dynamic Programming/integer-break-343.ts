// https://leetcode.com/problems/integer-break/

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a DP array with the length of the target + 1, values = idx
//   - Set the last value of the DP array to 0 (to ensure we can't use the last value since we have to split at least in 2 elements)
//   - Iterate through the DP array from 2 to n and for each target:
//     - Iterate through the target from 1 to target - 1 and for each i:
//       - Update the target DP value with the max(current target DP value, i * the DP value of the target - i)
//   - Return the last value of the DP array

// Complexities:
// Time => O(n^2), where n is the target number
// Space => O(n), where n is the target number

function integerBreak(n: number): number {
	const dp = Array.from({ length: n + 1 }, (_, i) => i);
	dp[n] = 0;
	for (let target = 2; target <= n; target++) {
		for (let i = 1; i < target; i++) {
			dp[target] = Math.max(dp[target], i * dp[target - i]);
		}
	}

	return dp[n];
}
