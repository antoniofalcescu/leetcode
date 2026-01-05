// https://leetcode.com/problems/stone-game/

// TL;DR:
// Use a recursive approach with memoization
//   - Initialize a 2D DP array with the length of the piles array, values = undefined
//   - Base case: If the left index is greater than the right index, return 0
//   - Recursive case:
//     - If the current value is already calculated, return the value
//     - Calculate if alice picks by checking if the current index is even or odd (right - left) % 2 === 0 (alice starts and the array is even at the start)
//     - According to who picks:
//       - If Alice picks, initialize the result with 0 and check both first/last stone picks and update the result with the maximum of the two
//       - If Bob picks, initialize the result with Infinity and check both first/last stone picks and update the result with the minimum of the two (don't add the piles value to the result)
//     - Update the DP array with the result
// Calculate the total sum of the piles and return if alice's score is greater than the total sum minus alice's score

// Complexities:
// Time => O(n^2), where n is the length of the piles array
// Space => O(n^2), where n is the length of the piles array

function stoneGame(piles: number[]): boolean {
	const dp: (number | undefined)[][] = Array.from(
		{ length: piles.length },
		() => Array.from({ length: piles.length }, () => undefined)
	);
	function bkt(left: number, right: number): number {
		if (left > right) {
			return 0;
		}
		if (dp[left][right] !== undefined) {
			return dp[left][right];
		}

		const alicePicks = (right - left + 1) % 2 === 0;
		let result = alicePicks ? 0 : Infinity;
		if (alicePicks) {
			result = Math.max(
				result,
				piles[left] + bkt(left + 1, right),
				piles[right] + bkt(left, right - 1)
			);
		} else {
			result = Math.min(result, bkt(left + 1, right), bkt(left, right - 1));
		}

		dp[left][right] = result;
		return result;
	}

	const aliceSum = bkt(0, piles.length - 1);
	const totalSum = piles.reduce((acc, num) => acc + num, 0);
	return aliceSum > totalSum - aliceSum;
}
