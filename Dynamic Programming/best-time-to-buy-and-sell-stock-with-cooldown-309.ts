// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/

// Hint:
// - Consider 2 decisions on each day: Buy/Sell + Cooldown
// - Draw Decision Tree with these states -> Cache based on (day, canBuy) and define the Top-Down Recursive Cases
// - Optimize to Bottom-Up in O(1) space since the buy/sell states on a certain day depend only on the next day's buy/sell and the next next day's buy (because of cooldown after buying)

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize three variables to store the current ith + 1 and ith + 2 buy values and the ith + 1 sell value
//   - Iterate through the string right to left:
//     - Calculate the current buy based on the max(holding (meaning buying on the next day), and purchasing today so that we can sell on a future max day)
//     - Calculate the current sell based on the max(holding (meaning selling on the next day), and selling today so that we can buy on a future min day (including cooldown))
//     - Shift the DP values to the left accordingly
//   - Return the dp1 buy value

// Complexities:
// Time => O(n), where n is the length of the string
// Space => O(1)

function maxProfit(prices: number[]): number {
	let [dp1Buy, dp2Buy, dp1Sell] = [0, 0, 0];

	for (let i = prices.length - 1; i >= 0; i--) {
		const currDpBuy = Math.max(dp1Sell - prices[i], dp1Buy);
		const currDpSell = Math.max(dp2Buy + prices[i], dp1Sell);

		dp2Buy = dp1Buy;
		dp1Buy = currDpBuy;
		dp1Sell = currDpSell;
	}

	return dp1Buy;
}
