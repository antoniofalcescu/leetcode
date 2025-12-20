// https://leetcode.com/problems/extra-characters-in-a-string-2707/

// TL;DR:
// Similar to LC. 139 Word Break
// Use a backtracking approach with memoization:
//   - Base case: if the index is equal to the length of the string, return 0
//   - If the current index is in the cache, return the value from the cache
//   - Otherwise:
//     - Set the result to 1 + the result of the next index (worst case)
//     - Iterate through the string from the current index to the end of the string
//     - Use a helper Trie to check if the current substring is a word
//     - If it is, set the result to the minimum of the current result and the result of the next index
//     - Update the cache with the result
//   - Return the result

// Complexities:
// Time => O(k * m + n^2), where n is the length of the string, m is the length of the dictionary and k is the average length of the words in the dictionary (worst case)
// Space => O(k * m + n), where n is the length of the string and m is the length of the dictionary and k is the average length of the words in the dictionary (Trie and cache)

class TrieNode {
	children: Map<string, TrieNode>;
	endOfWord: boolean;

	constructor() {
		this.children = new Map();
		this.endOfWord = false;
	}
}

class Trie {
	readonly root: TrieNode;

	constructor(words: string[]) {
		this.root = new TrieNode();
		for (const word of words) {
			this.addWord(word);
		}
	}

	private addWord(word: string): void {
		let curr: TrieNode = this.root;
		for (const c of word) {
			if (!curr.children.has(c)) {
				curr.children.set(c, new TrieNode());
			}
			curr = curr.children.get(c)!;
		}
		curr.endOfWord = true;
	}
}

function minExtraChar(s: string, dictionary: string[]): number {
	const cache: number[] = Array.from(
		{ length: s.length + 1 },
		() => undefined!
	);

	const root = new Trie(dictionary).root;

	function dfs(i: number): number {
		if (i === s.length) {
			return 0;
		}
		if (cache[i] !== undefined) {
			return cache[i];
		}

		let curr = root;
		let result = 1 + dfs(i + 1);
		for (let j = i; j < s.length; j++) {
			if (!curr.children.has(s[j])) {
				break;
			}
			curr = curr.children.get(s[j])!;
			if (curr.endOfWord) {
				result = Math.min(result, dfs(j + 1));
			}
		}

		cache[i] = result;
		return result;
	}

	return dfs(0);
}
