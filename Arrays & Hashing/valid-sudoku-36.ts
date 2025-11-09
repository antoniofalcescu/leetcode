// https://leetcode.com/problems/valid-sudoku/

// TL;DR:
// Use 3 sets to store the numbers in the rows, columns and squares
// Iterate through the board and for each number:
//   - calculate the square index based on the current row and column
//   - check if the number is already in the set for the row, column or square -> return false
//   - add the number to all sets
// Return true

// Complexities:
// Time => O(n^2), where n is the size of the board (9x9)
// Space => O(n^2), where n is the size of the board (9x9)

function isValidSudoku(board: string[][]): boolean {
	const rows = Array.from({ length: 9 }, () => new Set());
	const cols = Array.from({ length: 9 }, () => new Set());
	const squares = Array.from({ length: 9 }, () => new Set());

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			const val = board[i][j];
			if (val === ".") {
				continue;
			}

			const squareIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
			if (
				rows[i].has(val) ||
				cols[j].has(val) ||
				squares[squareIndex].has(val)
			) {
				return false;
			}

			rows[i].add(val);
			cols[j].add(val);
			squares[squareIndex].add(val);
		}
	}

	return true;
}
