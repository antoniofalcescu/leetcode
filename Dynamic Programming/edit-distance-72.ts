// https://leetcode.com/problems/edit-distance/

// TL;DR:
// Use a 2D DP bottom-up approach
//   - Initialize a 2D DP array with the length of the word1 + 1 and word2 + 1, values = 0
//   - Set the last row values to the length of the word1 - i (base case)
//   - Set the last column values to the length of the word2 - j (base case)
//   - Iterate through the word1 backwards and for each index:
//     - Iterate through the word2 backwards and for each index:
//       - If chars in both strings match at their current indices, update the DP value with the diagonal value from the DP table
//       - Otherwise, update the DP value with 1 + min of all possible operations (delete, insert, replace):
//         - Delete: dp[i1 + 1][i2]
//         - Insert: dp[i1][i2 + 1]
//         - Replace: dp[i1 + 1][i2 + 1]
//   - Return the first value of the DP array (top left corner)

// Complexities:
// Time => O(m * n), where m is the length of word1 and n is the length of word2 (we iterate through the strings once)
// Space => O(m * n), where m is the length of word1 and n is the length of word2 (DP array)

function minDistance(word1: string, word2: string): number {
	const dp = Array.from({ length: word1.length + 1 }, () =>
		Array.from({ length: word2.length + 1 }, () => 0)
	);
	for (let i = 0; i < word1.length; i++) {
		dp[i][word2.length] = word1.length - i;
	}
	for (let j = 0; j < word2.length; j++) {
		dp[word1.length][j] = word2.length - j;
	}

	for (let i1 = word1.length - 1; i1 >= 0; i1--) {
		for (let i2 = word2.length - 1; i2 >= 0; i2--) {
			if (word1[i1] === word2[i2]) {
				dp[i1][i2] = dp[i1 + 1][i2 + 1];
			} else {
				const del = dp[i1 + 1][i2];
				const insert = dp[i1][i2 + 1];
				const replace = dp[i1 + 1][i2 + 1];
				dp[i1][i2] += 1 + Math.min(del, insert, replace);
			}
		}
	}

	return dp[0][0];
}
