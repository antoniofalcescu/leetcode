// https://leetcode.com/problems/range-sum-query-2d-immutable/

// Hint:
// - Use a prefix sum matrix

// TL;DR:
// Use a prefix sum matrix to store the sum of the submatrixes
// In the constructor, iterate through the matrix and calculate the prefix sum for each cell (border top and left with 0 for ease of use)
//   - Formula is: prefix[i][j] = left + top + matrix[i][j] - topLeft
// For the sumRegion function, use the prefix sum matrix to calculate the sum of the submatrix in O(1)
//   - Formula is: sum = bottomRight - outsideTopRight - outsideBottomLeft + outsideTopLeft

// Complexities:
// Time => O(1) for the sumRegion function, O(m * n) for the constructor
// Space => O(m * n), where m is the number of rows and n is the number of columns in the matrix

class NumMatrix {
	private readonly prefix: number[][];

	constructor(matrix: number[][]) {
		const ROWS = matrix.length;
		const COLS = matrix[0].length;

		this.prefix = Array.from({ length: ROWS }, () =>
			Array.from({ length: COLS }, () => 0)
		);
		for (let i = 0; i < ROWS; i++) {
			for (let j = 0; j < COLS; j++) {
				const left = j > 0 ? this.prefix[i][j - 1] : 0;
				const top = i > 0 ? this.prefix[i - 1][j] : 0;
				const topLeft = i * j > 0 ? this.prefix[i - 1][j - 1] : 0;

				this.prefix[i][j] = matrix[i][j] + top + left - topLeft;
			}
		}
	}

	sumRegion(row1: number, col1: number, row2: number, col2: number): number {
		const bottomRight = this.prefix[row2][col2];
		const outsideTopRight = row1 > 0 ? this.prefix[row1 - 1][col2] : 0;
		const outsideBottomLeft = col1 > 0 ? this.prefix[row2][col1 - 1] : 0;
		const outsideTopLeft =
			row1 * col1 > 0 ? this.prefix[row1 - 1][col1 - 1] : 0;

		return bottomRight - outsideTopRight - outsideBottomLeft + outsideTopLeft;
	}
}
