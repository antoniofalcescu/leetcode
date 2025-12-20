// https://leetcode.com/problems/island-perimeter/

// TL;DR:
// Similar to LC. 200 Number of Islands, but DFS here is overkill since we only care about the immediate neighbors and not the entire island
// Keep track of a perimeter variable and use one pass iteration through the grid:
//   - For each cell that is a 1, add 4 to the perimeter
//   - If the cell to the right is a 1, subtract 2 from the perimeter (remove the edge that is shared for both cells)
//   - If the cell below is a 1, subtract 2 from the perimeter (remove the edge that is shared for both cells)
// Return the perimeter

// Complexities:
// Time => O(m * n), where m is the number of rows and n is the number of columns in the grid
// Space => O(1), where we don't use any extra space

function islandPerimeter(grid: number[][]): number {
	const ROWS = grid.length;
	const COLS = grid[0].length;

	let perimeter = 0;
	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLS; j++) {
			if (grid[i][j] === 1) {
				perimeter += 4;
				if (j + 1 < COLS && grid[i][j + 1] === 1) {
					perimeter -= 2;
				}
				if (i + 1 < ROWS && grid[i + 1][j] === 1) {
					perimeter -= 2;
				}
			}
		}
	}

	return perimeter;
}
