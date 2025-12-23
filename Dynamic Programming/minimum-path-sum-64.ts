// https://leetcode.com/problems/minimum-path-sum/

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a DP array with the length of the columns + 1, values = Infinity
//   - Iterate through the DP array backwards and for each cell:
//     - If the current cell is the last cell, set the current DP value to the value of the current cell
//     - Otherwise, set the current DP value to the value of the current cell + the minimum of the value of the cell below and the cell to the right
//   - Return the first value of the DP array

// Complexities:
// Time => O(r * c), where r is the number of rows and c is the number of columns
// Space => O(c), where c is the number of columns

function minPathSum(grid: number[][]): number {
	const ROWS = grid.length;
	const COLS = grid[0].length;
	const dp = Array.from({ length: COLS + 1 }, () => Infinity);
	for (let r = ROWS - 1; r >= 0; r--) {
		for (let c = COLS - 1; c >= 0; c--) {
			if (r === ROWS - 1 && c === COLS - 1) {
				dp[c] = grid[r][c];
				continue;
			}

			const down = dp[c];
			const right = dp[c + 1];
			dp[c] = grid[r][c] + Math.min(down, right);
		}
	}

	return dp[0];
}
