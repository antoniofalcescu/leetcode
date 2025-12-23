// https://leetcode.com/problems/stone-game-ii/

// TL;DR:
// Use a recursive approach with memoization (top-down) for which we'll calculate Alice's score:
//   - Initialize a 3D DP array with the length of the piles array, the length of the piles array + 1, and 2 value for Alice/Bob turn, values = undefined
//   - Base case: If the index is equal to the length of the piles array, return 0
//   - Recursive case:
//     - If the current value is already calculated, return the value
//     - Initialize the result with Infinity if it's Bob's turn, 0 if it's Alice's turn and a total sum with 0
//     - Iterate through the possible X values:
//       - Handle edge case where we go out of bounds
//       - Add the current pile value to the total sum
//       - If it's Alice's turn, we want to get the maximum possible score with adding the current total and recursively checking the future with Bob's turn
//       - If it's Bob's turn, we want to get the minimum possible score with recursively checking the future with Alice's turn

// Complexities:
// Time => O(n^3), where n is the length of the piles array
// Space => O(n^2), where n is the length of the piles array

function stoneGameII(piles: number[]): number {
	const dp: (number | undefined)[][][] = Array.from(
		{ length: piles.length },
		() => Array.from({ length: piles.length + 1 }, () => [undefined, undefined])
	);

	function bkt(i: number, M: number, alice: number): number {
		if (i === piles.length) {
			return 0;
		}
		if (dp[i][M][alice] !== undefined) {
			return dp[i][M][alice];
		}

		let result = alice ? 0 : Infinity;
		let total = 0;
		for (let X = 1; X <= 2 * M; X++) {
			const idx = i + X - 1;
			if (idx === piles.length) {
				break;
			}

			total += piles[idx];
			if (alice) {
				result = Math.max(result, total + bkt(i + X, Math.max(M, X), 0));
			} else {
				result = Math.min(result, bkt(i + X, Math.max(M, X), 1));
			}
		}

		dp[i][M][alice] = result;
		return result;
	}

	return bkt(0, 1, 1);
}
