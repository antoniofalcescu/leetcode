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
	let top = 0;
	let bottom = matrix.length - 1;

	while (top <= bottom) {
		const mid = Math.floor((bottom + top) / 2);

		if (target > matrix[mid][matrix[mid].length - 1]) {
			top = mid + 1;
		} else if (target < matrix[mid][0]) {
			bottom = mid - 1;
		} else {
			top = mid;
			break;
		}
	}

	if (top >= matrix.length) {
		return false;
	}

	let left = 0;
	let right = matrix[top].length - 1;

	while (left <= right) {
		const mid = Math.floor((right + left) / 2);

		if (matrix[top][mid] === target) {
			return true;
		}

		if (matrix[top][mid] > target) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	return false;
}
