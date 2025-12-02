// https://neetcode.io/problems/foreign-dictionary/question

// Hint:
// - It's a Topological Sort Postorder Traversal problem:
//   - The adjancecy list is built by iterating through each pair of words in the input and treating each letter as a node and each pair of different sorted letters as an edge
//   - Keep track of cycles inside the DFS and how the output will be generated in Postorder traversal

// TL;DR:
// Use a topological sort approach to find the order of the letters in the alien dictionary
//   - Convert the words to an adjacency list
//   - Iterate through the words and add the letters to the adjacency list
//   - Iterate through the words and add the edges to the adjacency list
//   - Run topological sort on the adjacency list
//   - Return the order of the letters

// Complexities:
// Time => O(V + E + N), where V is the number of unique letters, E is the number of edges (connections between letters) and N is the total number of letters in all words
// Space => O(V + E), where V is the number of unique letters and E is the number of edges (connections between letters)

class AlienDictionarySolution {
	/**
	 * @param {string[]} words
	 * @returns {string}
	 */
	foreignDictionary(words) {
		const adjList = {};
		for (const word of words) {
			for (const c of word) {
				adjList[c] = new Set();
			}
		}

		for (let i = 0; i < words.length - 1; i++) {
			const [w1, w2] = [words[i], words[i + 1]];
			const smallLength = Math.min(w1.length, w2.length);
			if (
				w1.length > w2.length &&
				w1.slice(0, smallLength) === w2.slice(0, smallLength)
			) {
				return "";
			}
			for (let j = 0; j < smallLength; j++) {
				if (w1[j] !== w2[j]) {
					adjList[w1[j]].add(w2[j]);
					break;
				}
			}
		}

		const visited = new Set();
		const visiting = new Set();
		const ans: string[] = [];

		function dfs(letter) {
			if (visiting.has(letter)) {
				return false;
			}
			if (visited.has(letter)) {
				return true;
			}

			visiting.add(letter);
			for (const nei of adjList[letter]) {
				if (!dfs(nei)) {
					return false;
				}
			}

			visiting.delete(letter);
			visited.add(letter);
			ans.push(letter);

			return true;
		}

		for (const letter of Object.keys(adjList)) {
			if (!dfs(letter)) {
				return "";
			}
		}

		return ans.reverse().join("");
	}
}
