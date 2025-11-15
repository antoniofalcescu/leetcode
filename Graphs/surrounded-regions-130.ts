// https://leetcode.com/problems/surrounded-regions/

// TL;DR:
// Start from the matrix edges and use a DFS to traverse the grid and mark all cells that are connected to the edges as 'S'
// Then, iterate through the grid and mark all cells that are still 'O' as 'X' and all cells that are 'S' as 'O'

// Complexities:
// Time => O(n * m), where n is the number of rows and m is the number of columns in the grid
// Space => O(n * m), where n is the number of rows and m is the number of columns in the grid

/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {
	const ROWS = board.length;
	const COLS = board[0].length;

	function dfs(row: number, col: number): void {
		const inBounds = row >= 0 && row < ROWS && col >= 0 && col < COLS;
		if (!inBounds || board[row][col] !== "O") {
			return;
		}
		board[row][col] = "S";

		const DIRS = [
			[0, -1],
			[0, 1],
			[-1, 0],
			[1, 0],
		];
		for (const [dr, dc] of DIRS) {
			const [newRow, newCol] = [row + dr, col + dc];
			dfs(newRow, newCol);
		}
	}

	for (let c = 0; c < COLS; c++) {
		dfs(0, c);
		dfs(ROWS - 1, c);
	}

	for (let r = 0; r < ROWS; r++) {
		dfs(r, 0);
		dfs(r, COLS - 1);
	}

	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			if (board[r][c] === "O") {
				board[r][c] = "X";
			} else if (board[r][c] === "S") {
				board[r][c] = "O";
			}
		}
	}
}
