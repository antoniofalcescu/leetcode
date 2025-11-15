// https://neetcode.io/problems/islands-and-treasure

// TL;DR:
// Use a multi-source BFS approach
// First, add all the cells that are 0 to the BFS queue
// Then, use a BFS to traverse the grid:
//   - For each cell, go in all 4 possible directions (up, down, left, right) if we're in bounds and the cell is INF
//   - Set the neighboring cell to the current cell + 1 and add the neighboring cell to the BFS queue

// Complexities:
// Time => O(m * n), where m is the number of rows and n is the number of columns in the grid
// Space => O(m * n), where m is the number of rows and n is the number of columns in the grid

class WallsAndGatesSolution {
	/**
	 * @param {number[][]} grid
	 */
	islandsAndTreasure(grid) {
		const INF = Math.pow(2, 31) - 1;
		const ROWS = grid.length;
		const COLS = grid[0].length;
		const DIRS = [
			[0, -1],
			[0, 1],
			[-1, 0],
			[1, 0],
		];

		const queue: [number, number][] = [];
		for (let r = 0; r < ROWS; r++) {
			for (let c = 0; c < COLS; c++) {
				if (grid[r][c] === 0) {
					queue.push([r, c]);
				}
			}
		}
		while (queue.length) {
			const [r, c] = queue.shift()!;
			for (const [dr, dc] of DIRS) {
				const [newR, newC] = [r + dr, c + dc];
				const inBounds = newR >= 0 && newR < ROWS && newC >= 0 && newC < COLS;

				if (inBounds && grid[newR][newC] === INF) {
					grid[newR][newC] = grid[r][c] + 1;
					queue.push([newR, newC]);
				}
			}
		}
	}
}
