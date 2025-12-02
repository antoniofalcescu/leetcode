// https://leetcode.com/problems/unique-paths/

// Hint:
// - 2D DP bottom-up approach, the O(n) space optimization can be done if we reuse the row for the bottom value

// TL;DR:
// Use a 2D DP bottom-up approach
//   - Initialize a DP array with the length of n, values = 1 (current row)
//   - Iterate backkwards through the rows:
//     - Iterate backkwards through the columns:
//       - The current DP value is the sum of the current and the right value (the bottom value is taken implicitly since we reuse the row DP array)
//   - Return the first value of the DP array

// Complexities:
// Time => O(m * n), where m is the number of rows and n is the number of columns
// Space => O(n), where n is the number of columns

function uniquePaths(m: number, n: number): number {
	const dp = Array.from({ length: n }, () => 1);
	for (let i = m - 2; i >= 0; i--) {
		for (let j = n - 2; j >= 0; j--) {
			dp[j] += dp[j + 1];
		}
	}

	return dp[0];
}
