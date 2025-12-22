// https://leetcode.com/problems/perfect-squares/

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a DP array with the length of the target + 1, values = Infinity
//   - Set the first value of the DP array to 0 (base case)
//   - Iterate through the DP array from 1 to n and for each target:
//     - Calculate the target root
//     - Iterate backwards from the target root to 1 and for each i:
//       - Calculate the square root
//       - Update the target DP value with min(current target DP value, 1 + the DP value of the target - square root)
//   - Return the last value of the DP array

// Complexities:
// Time => O(n * sqrt(n)), where n is the target number
// Space => O(n), where n is the target number

function numSquares(n: number): number {
	const dp = Array.from({ length: n + 1 }, () => Infinity);
	dp[0] = 0;
	for (let target = 1; target <= n; target++) {
		const targetRoot = Math.floor(Math.sqrt(target));
		for (let i = targetRoot; i >= 1; i--) {
			const squareRoot = i * i;
			dp[target] = Math.min(dp[target], 1 + dp[target - squareRoot]);
		}
	}

	return dp[n];
}
