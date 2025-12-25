// https://leetcode.com/problems/spiral-matrix/

// TL;DR:
// Use a four-pointer approach to traverse the matrix:\
//   - Initialize 4 pointers: left = 0, right = COLS, top = 0, bottom = ROWS
//   - While left pointer < right pointer and top pointer < bottom pointer:
//     - Traverse the top row from left to right and increment top pointer
//     - Traverse the right column from top to bottom and decrement right pointer
//     - If top=bottom or left=right, break the loop (we had only 1 row/column)
//     - Traverse the bottom row from right to left and decrement bottom pointer
//     - Traverse the left column from bottom to top and increment left pointer
// Return the spiral order

// Complexities:
// Time => O(n * m), where n is the number of rows and m is the number of columns
// Space => O(1) additional space, O(n * m) output array, where n is the number of rows and m is the number of columns

function spiralOrder(matrix: number[][]): number[] {
	const ROWS = matrix.length;
	const COLS = matrix[0].length;

	const ans: number[] = [];
	let [left, right] = [0, COLS];
	let [top, bottom] = [0, ROWS];
	while (left < right && top < bottom) {
		// first row
		for (let i = left; i < right; i++) {
			ans.push(matrix[top][i]);
		}
		top++;

		// last column
		for (let i = top; i < bottom; i++) {
			ans.push(matrix[i][right - 1]);
		}
		right--;

		// if we had only 1 row/column
		if (top === bottom || left === right) {
			break;
		}

		// last row
		for (let i = right - 1; i >= left; i--) {
			ans.push(matrix[bottom - 1][i]);
		}
		bottom--;

		// first column
		for (let i = bottom - 1; i >= top; i--) {
			ans.push(matrix[i][left]);
		}
		left++;
	}

	return ans;
}
