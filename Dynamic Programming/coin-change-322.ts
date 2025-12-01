// https://leetcode.com/problems/coin-change/

// Hint:
// - DP bottom-up approach, draw Decision Tree to understand when to consider each coin based on the current amount

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a DP array with the length of the amount + 1, values = Infinity and set the first value to 0
//   - Iterate through the amount and for each amount:
//     - Iterate through the coins and for each coin:
//       - If the current coin is still in the range of the amount, update the amount DP value with 1 + DP[diff] if it's smaller
//   - Return the DP array at the amount or -1 if the amount is not possible to make

// Complexities:
// Time => O(n * m), where n is the length of the coins array and m is the amount
// Space => O(m), where m is the amount

function coinChange(coins: number[], amount: number): number {
	const dp = Array.from({ length: amount + 1 }, () => Infinity);
	dp[0] = 0;
	for (let a = 1; a <= amount; a++) {
		for (const coin of coins) {
			if (a - coin >= 0) {
				dp[a] = Math.min(dp[a], 1 + dp[a - coin]);
			}
		}
	}

	return dp[amount] === Infinity ? -1 : dp[amount];
}
