// https://leetcode.com/problems/implement-trie-prefix-tree/

// TL;DR:
// Use a TrieNode class to represent the nodes in the trie
// Use a dummy root node to represent the root of the trie
// In the insert method:
//   - Iterate through the word and create a new node for each character (if it doesn't exist already)
//   - Set the endOfWord flag to true for the last letter node
// In the search method:
//   - Iterate through the word and check if the character is in the node's children (if not, return false)
//   - Return true if the endOfWord flag is true for the last node
// In the startsWith method:
//   - Iterate through the prefix and check if the character is in the node's children (if not, return false)
//   - Return true if the last letter is reached

// Complexities:
// Time => O(n), where n is the length of the input word or prefix
// Space => O(m), where m is the number of unique characters in the input words

class TrieNode {
	children: Map<string, TrieNode>;
	endOfWord: boolean;

	constructor() {
		this.children = new Map();
		this.endOfWord = false;
	}
}

class Trie {
	private readonly root: TrieNode;

	constructor() {
		this.root = new TrieNode();
	}

	insert(word: string): void {
		let curr = this.root;
		for (const c of word) {
			if (!curr.children.has(c)) {
				curr.children.set(c, new TrieNode());
			}
			curr = curr.children.get(c)!;
		}
		curr.endOfWord = true;
	}

	search(word: string): boolean {
		let curr = this.root;
		for (const c of word) {
			if (!curr.children.has(c)) {
				return false;
			}
			curr = curr.children.get(c)!;
		}
		return curr.endOfWord;
	}

	startsWith(prefix: string): boolean {
		let curr = this.root;
		for (const c of prefix) {
			if (!curr.children.has(c)) {
				return false;
			}
			curr = curr.children.get(c)!;
		}
		return true;
	}
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
