// https://leetcode.com/problems/rotate-image/

// TL;DR:
// Use a two-pointer approach to rotate the matrix in place:
//   - While left pointer < right pointer:
//     - Create 2 more pointers: top and bottom, both initialized to the left pointer and right pointer respectively (since the matrix is a square)
//     - Use a for loop for the offset for each element in the current layer
//     - Swap counter clockwise the following elements:
//       - topLeft = bottomLeft
//       - bottomLeft = bottomRight
//       - bottomRight = topRight
//       - topRight = topLeft
//   - Increment the left pointer and decrement the right pointer

// Complexities:
// Time => O(n^2), where n is the length of the matrix
// Space => O(1)

function rotate(matrix: number[][]): void {
	const n = matrix.length;
	let [left, right] = [0, n - 1];
	while (left < right) {
		const [top, bottom] = [left, right];
		for (let i = 0; i < right - left; i++) {
			const topLeft = matrix[top][left + i];

			// bottomLeft -> topLeft
			matrix[top][left + i] = matrix[bottom - i][left];

			// bottomRight -> bottomLeft
			matrix[bottom - i][left] = matrix[bottom][right - i];

			// topRight -> bottomRight
			matrix[bottom][right - i] = matrix[top + i][right];

			// topLeft -> topRight
			matrix[top + i][right] = topLeft;
		}

		left++;
		right--;
	}
}
