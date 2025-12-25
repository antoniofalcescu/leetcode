// https://leetcode.com/problems/set-matrix-zeroes/

// TL;DR:
// Main idea for O(1) space solution is to mark the first row and first column cells with 0s if we find a cell in that row/column = 0.
// Only edge case is the top left cell that we need to handle separately as it's common for both first row and first column:
//   - Keep 2 separate variables for the first row and first column
// Iterate through the matrix and for each cell:
//   - If we find a cell = 0,  mark the first cell of that row/column as 0 (unless its first row/column -> mark it in the variables)
// After the first pass, iterate from second row and column through the matrix and for each cell:
//   - If the first cell of that row/column is 0, set the cell to 0
// If the first row variable is 0, set the first row to 0
// If the first column variable is 0, set the first column to 0

// Complexities:
// Time => O(n * m), where n is the number of rows and m is the number of columns
// Space => O(1)

function setZeroes(matrix: number[][]): void {
	const ROWS = matrix.length;
	const COLS = matrix[0].length;

	let firstRow = 1;
	let firstColumn = 1;
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			if (matrix[r][c] === 0) {
				if (c > 0) {
					matrix[0][c] = 0;
				} else {
					firstColumn = 0;
				}

				if (r > 0) {
					matrix[r][0] = 0;
				} else {
					firstRow = 0;
				}
			}
		}
	}

	for (let r = 1; r < ROWS; r++) {
		for (let c = 1; c < COLS; c++) {
			if (matrix[0][c] === 0 || matrix[r][0] === 0) {
				matrix[r][c] = 0;
			}
		}
	}

	if (firstColumn === 0) {
		for (let r = 0; r < ROWS; r++) {
			matrix[r][0] = 0;
		}
	}

	if (firstRow === 0) {
		for (let c = 0; c < COLS; c++) {
			matrix[0][c] = 0;
		}
	}
}
