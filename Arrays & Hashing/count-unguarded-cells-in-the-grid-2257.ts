// https://leetcode.com/problems/count-unguarded-cells-in-the-grid/

// TL;DR:
// Basically brute force approach where you create a grid and mark the initial cells accordingly, then iterate in all 4 possible directions to mark guarded cells
// Create the grid with the following values:
//   - "O" for empty cells
//   - "G" for guards
//   - "W" for walls
//   - "X" for guarded cells
// For each guard, go in all 4 possible directions until we go out of bounds or hit a wall or a guard and mark the cell with 'X'
// Iterate through the grid and count the number of cells that are "O" and return it

// Complexities:
// Time => O(m * n), where m is the number of rows and n is the number of columns in the grid
// Space => O(m * n), where m is the number of rows and n is the number of columns in the grid

function countUnguarded(
	m: number,
	n: number,
	guards: number[][],
	walls: number[][]
): number {
	const DIRS = [
		[0, 1],
		[0, -1],
		[-1, 0],
		[1, 0],
	];
	const ROWS = m;
	const COLS = n;
	const grid = Array.from({ length: ROWS }, () =>
		Array.from({ length: COLS }, () => "O")
	);
	for (const [r, c] of guards) {
		grid[r][c] = "G";
	}
	for (const [r, c] of walls) {
		grid[r][c] = "W";
	}

	for (const [r, c] of guards) {
		for (const [dr, dc] of DIRS) {
			let [newR, newC] = [r + dr, c + dc];
			while (newR >= 0 && newR < ROWS && newC >= 0 && newC < COLS) {
				if (["G", "W"].includes(grid[newR][newC])) {
					break;
				}
				grid[newR][newC] = "X";
				[newR, newC] = [newR + dr, newC + dc];
			}
		}
	}

	let unguarded = 0;
	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLS; j++) {
			if (grid[i][j] === "O") {
				unguarded++;
			}
		}
	}

	return unguarded;
}
