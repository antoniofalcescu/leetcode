// https://leetcode.com/problems/online-stock-span/

// Hint:
// - Think if we still need a small value after we found a bigger one and how to efficiently still count it in the future

// TL;DR:
// Use a monotonic strictlydecreasing stack to store the [price, span] pairs
// Iterate through the prices array and:
//   - While the stack is not empty and the top of the stack is less than or equal to the current price, pop the stack and add the span to the answer
//   - Push the current price and span to the stack
// Return the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

class StockSpanner {
	private readonly list: number[][];

	constructor() {
		this.list = [];
	}

	next(price: number): number {
		let ans = 1;
		while (this.list.length && this.list[this.list.length - 1][0] <= price) {
			const [_, count] = this.list.pop()!;
			ans += count;
		}

		this.list.push([price, ans]);
		return ans;
	}
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
