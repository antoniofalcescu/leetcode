// https://leetcode.com/problems/range-sum-query-2d-immutable/

// Hint:
// - Use a prefix sum matrix

// TL;DR:
// Use a prefix sum matrix to store the sum of the submatrixes
// In the constructor, iterate through the matrix and calculate the prefix sum for each cell (border top and left with 0 for ease of use)
//   - Formula is: prefix[i + 1][j + 1] = prefix[i][j + 1] + prefix[i + 1][j] + matrix[i][j] - prefix[i][j]
// For the sumRegion function, use the prefix sum matrix to calculate the sum of the submatrix in O(1)
//   - Formula is: sum = prefix[row2 + 1][col2 + 1] - prefix[row1][col2 + 1] - prefix[row2 + 1][col1] + prefix[row1][col1]

// Complexities:
// Time => O(1) for the sumRegion function, O(m * n) for the constructor
// Space => O(m * n), where m is the number of rows and n is the number of columns in the matrix

class NumMatrix {
	private readonly prefix: number[][];

	constructor(matrix: number[][]) {
		const ROWS = matrix.length;
		const COLS = matrix[0].length;

		this.prefix = Array.from({ length: ROWS + 1 }, () =>
			Array.from({ length: COLS + 1 }, () => 0)
		);
		for (let i = 0; i < ROWS; i++) {
			for (let j = 0; j < COLS; j++) {
				this.prefix[i + 1][j + 1] =
					this.prefix[i][j + 1] +
					this.prefix[i + 1][j] +
					matrix[i][j] -
					this.prefix[i][j];
			}
		}
	}

	sumRegion(row1: number, col1: number, row2: number, col2: number): number {
		const bottomRight = this.prefix[row2 + 1][col2 + 1];
		const outsideTopRight = this.prefix[row1][col2 + 1];
		const outsideBottomLeft = this.prefix[row2 + 1][col1];
		const outsideTopLeft = this.prefix[row1][col1];

		return bottomRight - outsideTopRight - outsideBottomLeft + outsideTopLeft;
	}
}
