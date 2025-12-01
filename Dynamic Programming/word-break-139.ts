// https://leetcode.com/problems/word-break/

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a DP array with the length of the string + 1, values = false and set the last value to true
//   - Iterate through the string right to left:
//     - For each word in the wordDict:
//       - Check if the current substring length matches the word length and the substring is equal to the word
//       - If it is, update the DP value at the current index to the DP value at the index + the length of the word
//       - If the DP value at the current index is true, break the loop
//   - Return the DP value at the first index

// Complexities:
// Time => O(n * m * t), where n is the length of the string and m is the length of the wordDict and t is the max length of the words in the wordDict
// Space => O(n), where n is the length of the string (DP array)

function wordBreak(s: string, wordDict: string[]): boolean {
	const dp = Array.from({ length: s.length + 1 }, () => false);
	dp[s.length] = true;

	for (let i = s.length - 1; i >= 0; i--) {
		for (const word of wordDict) {
			const inBounds = i + word.length <= s.length;
			if (inBounds && s.slice(i, i + word.length) === word) {
				dp[i] = dp[i + word.length];
			}
			if (dp[i]) {
				break;
			}
		}
	}

	return dp[0];
}
