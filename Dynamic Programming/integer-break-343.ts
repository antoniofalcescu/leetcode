// https://leetcode.com/problems/integer-break/

// TL;DR:
// Use a recursive approach with memoization (top-down)
//   - Initialize a DP hash map with the target number as the key and the value as the maximum product
//   - Base case: If the target is 1, return 1
//   - Recursive case:
//     - If the current target is already in the DP hash map, return the value
//     - Initialize the product with 0 if it's the last element, otherwise the target (since we can't break the last element)
//     - Iterate through the target from 1 to target - 1 and for each j:
//       - Calculate the result by multiplying the product of the current target and the product of the target - j
//       - Update the product with the maximum value
//     - Update the DP hash map with the product
//     - Return the product

// Complexities:
// Time => O(n^2), where n is the target number
// Space => O(n), where n is the target number

function integerBreak(n: number): number {
	const dp: Record<number, number> = {};

	function bkt(target: number): number {
		if (target === 1) {
			return 1;
		}
		if (dp[target] !== undefined) {
			return dp[target];
		}

		let product = target === n ? 0 : target;
		for (let j = 1; j < target; j++) {
			const result = bkt(j) * bkt(target - j);
			product = Math.max(product, result);
		}

		dp[target] = product;
		return product;
	}

	return bkt(n);
}
