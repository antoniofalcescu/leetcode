// https://leetcode.com/problems/n-queens/

// Hint:
// - Keep track of 3 sets for the columns, positive diagonals and negative diagonals and move recursively from row to row

// TL;DR:
// Use a backtracking approach
//   - Base case: if the row is equal to the number of rows, push the current board to the answer array and return
//   - For each column:
//     - If the current position is not safe, continue (col, diagonals check)
//     - Add the current position to the sets and mark it in the board
//     - Recursively call the bkt function with the next row
//     - Clean up the current position from the sets and from the board

// Complexities:
// Time: O(n!), where n is the number of rows and columns
// Space: O(n), where n is the number of rows and columns

function solveNQueens(n: number): string[][] {
	const cols = new Set<number>();
	const posDiag = new Set<number>();
	const negDiag = new Set<number>();

	const ans: string[][] = [];

	const board = Array.from({ length: n }, () =>
		Array.from({ length: n }, () => ".")
	);

	function bkt(row: number): void {
		if (row === n) {
			ans.push(board.map((row) => row.join("")));
			return;
		}

		for (let col = 0; col < n; col++) {
			if (cols.has(col) || posDiag.has(row + col) || negDiag.has(row - col)) {
				continue;
			}

			cols.add(col);
			posDiag.add(row + col);
			negDiag.add(row - col);
			board[row][col] = "Q";

			bkt(row + 1);

			cols.delete(col);
			posDiag.delete(row + col);
			negDiag.delete(row - col);
			board[row][col] = ".";
		}
	}

	bkt(0);
	return ans;
}
