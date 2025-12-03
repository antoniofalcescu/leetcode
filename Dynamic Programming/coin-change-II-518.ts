// https://leetcode.com/problems/coin-change-ii/

// Hint:
// - Start with Backtracking (decisions are to calculate the sum from the current coin index onwards until we reach or overflow the amount)
// - Think of Memoization -> 2D DP array based on coin index and current amount
//     - Draw the 2D DP array with the 0 amount base case (trick is to use the coins as the rows and the amount as the columns)
// - Optimize the Bottom-Up approach to O(m) space by reusing the same row for the next coin

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a DP array with the length of the amount + 1, values = 0
//   - Iterate through the coins and for each coin:
//     - Iterate through the amount and for each amount:
//       - If the current amount is greater than or equal to the current coin, update the amount DP value with the sum of the current amount and the amount minus the current coin
//   - Return the DP array at the amount

// Complexities:
// Time => O(n * m), where n is the length of the coins array and m is the amount
// Space => O(m), where m is the amount

function change(amount: number, coins: number[]): number {
	coins.sort((a, b) => a - b);

	const dp = Array.from({ length: amount + 1 }, () => 0);
	dp[0] = 1;

	for (let i = 0; i < coins.length; i++) {
		for (let a = 1; a <= amount; a++) {
			if (a - coins[i] >= 0) {
				const left = dp[a - coins[i]];
				dp[a] += left;
			}
		}
	}

	return dp[amount];
}
