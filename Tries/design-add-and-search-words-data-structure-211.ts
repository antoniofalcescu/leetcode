// https://leetcode.com/problems/design-add-and-search-words-data-structure/

// TL;DR:
// Use a TrieNode class to represent the nodes in the trie
// Use a dummy root node to represent the root of the trie
// In the addWord method:
//   - Iterate through the word and create a new node for each character (if it doesn't exist already)
//   - Set the endOfWord flag to true for the last letter node
// In the search method:
//   - Use a helper function dfs to recursively search for the word
//   - If the character is a dot:
//     - Iterate through all of the node's children and recursively call dfs on each child with the next word index
//     - If any of the recursive calls return true, return true
//     - If no recursive calls return true, return false
//   - If the character is not a dot:
//     - Iteratively check if the character is in the node's children (if not, return false)
//     - Update the current node to the child node and continue the loop
//   - Return true if the endOfWord flag is true for the last node

// Complexities:
// Time => O(n), where n is the length of the input word or prefix
// Space => O(m), where m is the number of unique characters in the input words

class WordDictionary {
	private readonly root: TrieNode;

	constructor() {
		this.root = new TrieNode();
	}

	addWord(word: string): void {
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
		function dfs(idx: number, node: TrieNode): boolean {
			let curr = node;
			for (let i = idx; i < word.length; i++) {
				const c = word[i];
				if (c === ".") {
					for (const child of curr.children.values()) {
						if (dfs(i + 1, child)) {
							return true;
						}
					}
					return false;
				} else {
					if (!curr.children.has(c)) {
						return false;
					}
					curr = curr.children.get(c)!;
				}
			}

			return curr.endOfWord;
		}

		return dfs(0, this.root);
	}
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
