// https://leetcode.com/problems/n-queens-ii/

// Hint:
// - Keep track of 3 sets for the columns, positive diagonals and negative diagonals and move recursively from row to row

// TL;DR:
// Identical to LC. 51 N-Queens, just return the number of solutions instead of the boards
// Use a backtracking approach
//   - Base case: if the row is equal to the number of rows, increment the answer and return
//   - For each column:
//     - If the current position is not safe, continue (col, diagonals check)
//     - Add the current position to the sets and mark it in the board
//     - Recursively call the bkt function with the next row
//     - Clean up the current position from the sets and from the board

// Complexities:
// Time: O(n!), where n is the number of rows and columns
// Space: O(n), where n is the number of rows and columns

function totalNQueens(n: number): number {
	const cols = new Set<number>();
	const posDiags = new Set<number>();
	const negDiags = new Set<number>();

	const board = Array.from({ length: n }, () =>
		Array.from({ length: n }, () => ".")
	);
	let ans = 0;
	function bkt(row: number): void {
		if (row === n) {
			ans++;
			return;
		}

		for (let col = 0; col < n; col++) {
			const posDiag = row + col;
			const negDiag = row - col;

			if (cols.has(col) || posDiags.has(posDiag) || negDiags.has(negDiag)) {
				continue;
			}

			cols.add(col);
			posDiags.add(posDiag);
			negDiags.add(negDiag);

			bkt(row + 1);

			cols.delete(col);
			posDiags.delete(posDiag);
			negDiags.delete(negDiag);
		}
	}
	bkt(0);

	return ans;
}
