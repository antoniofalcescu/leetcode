// https://leetcode.com/problems/word-search-ii/

// Hint:
// - Use a Trie to store the words and a backtracking DFS function to search for words in the board (use visited matrix instead of set to pass)

// TL;DR:
// Use a Trie + backtracking DFS approach
// Add each word from the words list to the Trie
// TO search for words, write a backtracking DFS function that:
//   - Checks if the current position is in bounds, not visited and the current character is in the node's children (base case)
//   - If the current position is the end of a word, add the word to the answer set (solution found)
//   - Mark the current position as visited and recursively call the DFS function in all 4 directions
//   - Clean up the current position by marking it as not visited

// Complexities:
// Time => O(n * m * 4^k + s), where n is the number of rows, m is the number of columns, k is the length of the longest word and s is the length of all words in the input array
// Space => O(s), where s is the length of all words in the input array

class TrieNode {
	children: Map<string, TrieNode>;
	endOfWord: boolean;

	constructor() {
		this.children = new Map();
		this.endOfWord = false;
	}

	addWord(word: string): void {
		let curr: TrieNode = this;
		for (const c of word) {
			if (!curr.children.has(c)) {
				curr.children.set(c, new TrieNode());
			}
			curr = curr.children.get(c)!;
		}
		curr.endOfWord = true;
	}
}

function findWords(board: string[][], words: string[]): string[] {
	const root = new TrieNode();
	for (const word of words) {
		root.addWord(word);
	}

	const ROWS = board.length;
	const COLS = board[0].length;
	const DIRS = [
		[0, -1],
		[0, 1],
		[-1, 0],
		[1, 0],
	];

	const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
	const ans = new Set<string>();

	function dfs(r: number, c: number, node: TrieNode, word: string): void {
		const inBounds = r >= 0 && r < ROWS && c >= 0 && c < COLS;

		if (!inBounds || visited[r][c] || !node.children.has(board[r][c])) {
			return;
		}

		visited[r][c] = true;
		word += board[r][c];
		node = node.children.get(board[r][c])!;
		if (node.endOfWord) {
			ans.add(word);
		}

		for (const [dr, dc] of DIRS) {
			const [newR, newC] = [r + dr, c + dc];
			dfs(newR, newC, node, word);
		}

		visited[r][c] = false;
	}

	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLS; j++) {
			dfs(i, j, root, "");
		}
	}
	return Array.from(ans);
}
