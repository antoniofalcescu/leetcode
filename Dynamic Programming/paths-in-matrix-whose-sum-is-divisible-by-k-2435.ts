// https://leetcode.com/problems/paths-in-matrix-whose-sum-is-divisible-by-k/

// TL;DR:
// Use DP with a DFS approach with memoization (top-down)
// Base cases:
//   - If we reach the bottom right cell, return 1 if the remainder is 0, otherwise return 0
//   - If we go out of bounds, return 0
//   - If we have already calculated the result for the current cell and remainder, return the cached result
// Recursive cases:
//   - Calculate the new remainder by adding the current cell's value and taking modulo k
//   - Cache the result for the current cell and remainder
//   - Recursively call the DFS for the bottom and right cells with the new remainder
//   - Return the sum of the results modulo MOD

// Complexities:
// Time => O(m * n * k), where m is the number of rows and n is the number of columns in the grid and k is the modulo
// Space => O(m * n * k), where m is the number of rows and n is the number of columns in the grid and k is the modulo

function numberOfPaths(grid: number[][], k: number): number {
	const MOD = Math.pow(10, 9) + 7;
	const ROWS = grid.length;
	const COLS = grid[0].length;

	const cache = Array.from({ length: ROWS }, () =>
		Array.from({ length: COLS }, () => Array.from({ length: k }, () => -1))
	);

	function dfs(r: number, c: number, remainder: number): number {
		if (r === ROWS - 1 && c === COLS - 1) {
			remainder = (remainder + grid[r][c]) % k;
			return remainder === 0 ? 1 : 0;
		}
		if (r === ROWS || c === COLS) {
			return 0;
		}
		if (cache[r][c][remainder] !== -1) {
			return cache[r][c][remainder];
		}

		cache[r][c][remainder] =
			(dfs(r + 1, c, (remainder + grid[r][c]) % k) +
				dfs(r, c + 1, (remainder + grid[r][c]) % k)) %
			MOD;

		return cache[r][c][remainder];
	}

	return dfs(0, 0, 0);
}
