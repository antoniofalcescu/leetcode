// https://leetcode.com/problems/search-a-2d-matrix/

// TL;DR:
// Use 2 binary searches to find the row and then the column
// The first binary search should find the row in which target is between the first and last element (note to compare with the first element when < and with the last element when >)
// Then the second binary search should find the exact value in the row
// Return true if the target is found, otherwise return false

// Complexities:
// Time => O(log(m) + log(n)), where m is the number of rows and n is the number of columns
// Space => O(1)

function searchMatrix(matrix: number[][], target: number): boolean {
	const ROWS = matrix.length;
	const COLS = matrix[0].length;
	
	let row = -1;
	let [top, bottom] = [0, ROWS - 1];
	while (top <= bottom) {
			const mid = Math.floor((top + bottom) / 2);
			if (matrix[mid][0] <= target && matrix[mid][COLS - 1] >= target) {
					row = mid;
					break;
			}
			if (matrix[mid][0] > target) {
					bottom = mid - 1;
			} else if (matrix[mid][COLS - 1] < target) {
					top = mid + 1;
			}
	}
	if (row === -1) {
			return false;
	}

	let [left, right] = [0, COLS - 1];
	while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			if (matrix[row][mid] === target) {
					return true;
			}
			if (matrix[row][mid] > target) {
					right = mid - 1;
			} else {
					left = mid + 1;
			}
	}

	return false;
};
