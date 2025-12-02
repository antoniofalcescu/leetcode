// https://leetcode.com/problems/longest-common-subsequence/

// Hint:
// - 2D DP bottom-up approach, the O(n) space optimization can be done if we reuse the row for the bottom value and keep track of the previous diagonal value

// TL;DR:
// Use a 2D DP bottom-up approach
//   - Make sure to run the DP array on the smaller string to optimize space
//   - Initialize a DP array with the length of the smaller string + 1, values = 0
//   - Iterate backwards through the rows:
//     - Initialize the previous diagonal value
//     - Iterate backwards through the columns:
//       - If the current characters match, update the DP value with 1 + the previous diagonal value
//       - Otherwise, update the DP value with the maximum of the current and the next value (in 2D array it's down and right)
//       - Update the previous diagonal value for the next iteration
//   - Return the first value of the DP array

// Complexities:
// Time => O(m * n), where m is the length of text1 and n is the length of text2
// Space => O(min(m, n)), where m is the length of text1 and n is the length of text2

function longestCommonSubsequence(text1: string, text2: string): number {
	if (text2.length < text1.length) {
		return longestCommonSubsequence(text2, text1);
	}

	const ROWS = text1.length;
	const COLS = text2.length;

	const dp = Array.from({ length: COLS + 1 }, () => 0);
	for (let i = ROWS - 1; i >= 0; i--) {
		let prevDiag = 0;
		for (let j = COLS - 1; j >= 0; j--) {
			let temp = dp[j];
			if (text1[i] === text2[j]) {
				dp[j] = 1 + prevDiag;
			} else {
				dp[j] = Math.max(dp[j], dp[j + 1]);
			}
			prevDiag = temp;
		}
	}

	return dp[0];
}
