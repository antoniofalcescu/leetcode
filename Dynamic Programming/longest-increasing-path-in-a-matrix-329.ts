// https://leetcode.com/problems/longest-increasing-path-in-a-matrix/

// TL;DR:
// Use a DFS approach with memoization (top-down)
// Base cases:
//   - If we have already calculated the result for the current cell, return the cached result
// Recursive cases:
//   - For all 4 directions neighbors, if they are in bounds and neighbor's value > current cell's value, update the result with max(result, 1 + dfs(neighbor))
//   - Cache and return the result for the current cell
// Run this DFS for all cells and return the maximum result, this will be amortized to O(r * c) since each cell is visited once

// Complexities:
// Time => O(r * c), where r is the number of rows and c is the number of columns (each cell is visited once)
// Space => O(r * c), where r is the number of rows and c is the number of columns (cache)

function longestIncreasingPath(matrix: number[][]): number {
	const ROWS = matrix.length;
	const COLS = matrix[0].length;
	const DIRS = [
		[0, -1],
		[0, 1],
		[1, 0],
		[-1, 0],
	];

	const cache: (number | undefined)[][] = Array.from({ length: ROWS }, () =>
		Array.from({ length: COLS }, () => undefined)
	);
	function dfs(r: number, c: number): number {
		if (cache[r][c] !== undefined) {
			return cache[r][c];
		}

		let result = 1;
		for (const [dr, dc] of DIRS) {
			const [newR, newC] = [r + dr, c + dc];
			const inBounds = newR >= 0 && newR < ROWS && newC >= 0 && newC < COLS;
			if (inBounds && matrix[newR][newC] > matrix[r][c]) {
				result = Math.max(result, 1 + dfs(newR, newC));
			}
		}

		cache[r][c] = result;
		return result;
	}

	let maxPath = 0;
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			maxPath = Math.max(maxPath, dfs(r, c));
		}
	}
	return maxPath;
}
