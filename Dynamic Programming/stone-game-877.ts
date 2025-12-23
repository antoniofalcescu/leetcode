// https://leetcode.com/problems/stone-game/

// TL;DR:
// Use a recursive approach with memoization
//   - Initialize a 2D DP array with the length of the piles array, values = undefined
//   - Base case: If the left index is greater than the right index, return 0
//   - Recursive case:
//     - If the current value is already calculated, return the value
//     - Calculate if alice picks by checking if the current index is even or odd (right - left) % 2 === 0 (alice starts and the array is even at the start)
//     - Calculate the pick first and pick last by checking if the alice picks is true or false
//     - Update the DP array with the maximum of the two possible picks (pick first + bkt(left + 1, right) or pick last + bkt(left, right - 1))
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

		const alicePicks = (right - left) % 2 === 0;
		const pickFirst = alicePicks ? piles[left] : 0;
		const pickLast = alicePicks ? piles[right] : 0;

		dp[left][right] = Math.max(
			pickFirst + bkt(left + 1, right),
			pickLast + bkt(left, right - 1)
		);
		return dp[left][right];
	}

	const total = piles.reduce((acc, num) => num + acc, 0);
	const alice = bkt(0, piles.length - 1);
	return alice > total - alice;
}
