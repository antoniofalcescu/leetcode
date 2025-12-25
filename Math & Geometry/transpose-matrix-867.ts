// https://leetcode.com/problems/transpose-matrix/

// TL;DR:
// Brute force approach:
//   - Create a new matrix with the number of columns and rows swapped
//   - Iterate through the original matrix and assign the value of the current cell to the transposed matrix at the corresponding column and row (transposed[c][r] = matrix[r][c])
// Return the transposed matrix

function transpose(matrix: number[][]): number[][] {
	const ROWS = matrix.length;
	const COLS = matrix[0].length;
	const transposed: number[][] = Array.from({ length: COLS }, () =>
		Array.from({ length: ROWS })
	);
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			transposed[c][r] = matrix[r][c];
		}
	}

	return transposed;
}
