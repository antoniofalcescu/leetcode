// https://leetcode.com/problems/longest-increasing-subsequence/

// Hint:
// - DP bottom-up approach, draw Decision Tree where for each number you have to consider all the numbers after it

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a DP array with the length of the nums array, values = 1 (each number is a subsequence of length 1)
//   - Iterate through the nums array right to left:
//     - For each index i, iterate through the nums array from i + 1 to the end:
//       - If the current number is less than the number at the index j, update the DP value of i with 1 + the DP value at the index j if it's greater
//   - Return the maximum value in the DP array

// Complexities:
// Time => O(n^2), where n is the length of the nums array
// Space => O(n), where n is the length of the nums array (DP array)

function lengthOfLIS(nums: number[]): number {
	const dp = Array.from({ length: nums.length }, () => 1);
	for (let i = nums.length - 2; i >= 0; i--) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] < nums[j]) {
				dp[i] = Math.max(dp[i], 1 + dp[j]);
			}
		}
	}

	return Math.max(...dp);
}
