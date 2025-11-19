// https://leetcode.com/problems/word-search/

// TL;DR:
// Use a backtracking approach
//   - Base case: if the index is equal to the length of the word, return true
//   - If the cell is out of bounds or already visited or the cell does not match the current character, return false
//   - Add the cell to the visited set for this recursion run
//   - Go in all 4 possible directions and recursively call the dfs function with the new index
//   - Remove the cell from the visited set so that other recursion runs can visit it
// Return true if the word is found, otherwise return false

// Complexities:
// Time: O(n * m * 4^l), where n is the number of rows in the board and m is the number of columns in the board and l is the length of the word
// Space: O(l), where l is the length of the word

function parseForSet(r: number, c: number): string {
	return `${r},${c}`;
}

function exist(board: string[][], word: string): boolean {
	const ROWS = board.length;
	const COLS = board[0].length;
	const DIRS = [
		[0, -1],
		[0, 1],
		[-1, 0],
		[1, 0],
	];

	const visited = new Set<string>();

	function dfs(r: number, c: number, idx: number) {
		if (idx === word.length) {
			return true;
		}

		const inBounds = r >= 0 && r < ROWS && c >= 0 && c < COLS;
		const parsed = parseForSet(r, c);
		if (!inBounds || visited.has(parsed) || board[r][c] !== word[idx]) {
			return false;
		}

		visited.add(parsed);
		for (const [dr, dc] of DIRS) {
			const [newR, newC] = [r + dr, c + dc];
			if (dfs(newR, newC, idx + 1)) {
				return true;
			}
		}
		visited.delete(parsed);
	}

	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLS; j++) {
			if (dfs(i, j, 0)) {
				return true;
			}
		}
	}
	return false;
}
