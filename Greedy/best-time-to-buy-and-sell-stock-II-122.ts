// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/

// Hint:
// - Could be solved with optimized bottom-up DP, but think what happens if we are greedy

// TL;DR:
// Use a greedy approach
//   - Initialize a variable to store the answer
//   - Iterate through the prices array and for each element:
//     - If the current element is greater than the previous element, add the difference to the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function maxProfit(prices: number[]): number {
	let maxProfit = 0;
	for (let right = 1; right < prices.length; right++) {
		if (prices[right] > prices[right - 1]) {
			maxProfit += prices[right] - prices[right - 1];
		}
	}

	return maxProfit;
}
