// https://leetcode.com/problems/unique-paths-ii/

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a DP array with the length of the columns + 1, values = 0
//   - Set the last value of the DP array to 1 (base case)
//   - Iterate through the rows backwards and for each row:
//     - Iterate through the columns backwards and for each column:
//        - If the current cell is an obstacle, set the current DP value to 0
//        - Otherwise, add to the current DP value the value of the DP value to the right (the bottom value is taken implicitly since we reuse the row DP array)
//   - Return the first value of the DP array

// Complexities:
// Time => O(r * c), where r is the number of rows and c is the number of columns
// Space => O(c), where c is the number of columns

function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
	const ROWS = obstacleGrid.length;
	const COLS = obstacleGrid[0].length;

	const dp = Array.from({ length: COLS + 1 }, () => 0);
	dp[COLS - 1] = 1;
	for (let r = ROWS - 1; r >= 0; r--) {
		for (let c = COLS - 1; c >= 0; c--) {
			if (obstacleGrid[r][c] === 1) {
				dp[c] = 0;
			} else {
				dp[c] += dp[c + 1];
			}
		}
	}

	return dp[0];
}
