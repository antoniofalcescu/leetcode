// https://leetcode.com/problems/distinct-subsequences/

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a DP array with the length of the t.length + 1, values = 0
//   - Set the last value of the DP array to 1 (base case)
//   - Iterate through the s backwards and for each index:
//     - Keep track of the diagonal value
//     - Iterate through the t backwards and for each index:
//       - Take a snapshot of the current element as the next diagonal value
//       - If chars in both strings match at their current indices, add the diagonal value to the current element
//       - Update the diagonal value with the snapshot for the next iteration
//   - Return the first value of the DP array

// Complexities:
// Time => O(m * n), where m is the length of s and n is the length of t
// Space => O(n), where n is the length of t

function numDistinct(s: string, t: string): number {
	const S = s.length;
	const T = t.length;
	if (T > S) {
		return 0;
	}

	const dp = Array.from({ length: T + 1 }, () => 0);
	dp[T] = 1;

	for (let i = S - 1; i >= 0; i--) {
		let diag = 1;
		for (let j = T - 1; j >= 0; j--) {
			const prevDiag = dp[j];
			if (s[i] === t[j]) {
				dp[j] += diag;
			}
			diag = prevDiag;
		}
	}

	return dp[0];
}
