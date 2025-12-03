// https://leetcode.com/problems/interleaving-string/

// Hint:
// - Recursive approach would be to take the character from s1 if they match the current character in s3 and similarly for s2 (none can match, only one can match or both can match)
// - After this, can either cache with Memoization or use a 2D array DP bottom-up approach
//     - For the Bottom-Up approach, think of a matrix with the lengths of the s1 and s2 strings where everything is false except the bottom right (out of bounds case)
//     - Draw the matrix and check how to fill a certain cell out (in reverse order) based on its neighbors (very similar to Backtracking logic)

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a 2D DP array with the length of the strings + 1, values = false
//   - Set the last value to true (base case where we have 0 elements in both strings = 0 element in the third string)
//   - Iterate through the strings bottom up, right to left:
//     - If the current character in s1 matches the current character in s3 and the next character in s1 also matched then set the DP value of the current indices to true
//     - If the current character in s2 matches the current character in s3 and the next character in s2 also matched then set the DP value of the current indices to true
//   - Return the first value of the DP array (bottom top corner)

// Complexities:
// Time => O(m * n), where m is the length of s1 and n is the length of s2
// Space => O(m * n), where m is the length of s1 and n is the length of s2 (DP array)

function isInterleave(s1: string, s2: string, s3: string): boolean {
	if (s1.length + s2.length !== s3.length) {
		return false;
	}

	const dp = Array.from({ length: s1.length + 1 }, () =>
		Array.from({ length: s2.length + 1 }, () => false)
	);
	dp[s1.length][s2.length] = true;

	for (let i = s1.length; i >= 0; i--) {
		for (let j = s2.length; j >= 0; j--) {
			if (i < s1.length && s1[i] === s3[i + j]) {
				if (dp[i + 1][j]) {
					dp[i][j] = true;
				}
			}
			if (j < s2.length && s2[j] === s3[i + j]) {
				if (dp[i][j + 1]) {
					dp[i][j] = true;
				}
			}
		}
	}

	return dp[0][0];
}
