// https://leetcode.com/problems/word-ladder/

// Hint:
// - BFS, but with the trick of building a pattern map where we replace each letter with a wildcard to get the neighbors

// TL;DR:
// Use a BFS approach, but with the trick of building the adjacency list of the words with a wildcard pattern
// An edge exists between two words if they differ by exactly one letter:
//   - For each word, generate a wildcard pattern by replacing each letter sequentially with a wildcard
//   - Add the word to the adjacency list for each wildcard pattern (the node itself is added to this map too)
// Run BFS from the beginWord until we reach the endWord or until we run out of words:
//   - To go to the next neighbor, generate all wildcard patterns for the current word and if they are not visited, add them to the queue and mark them as visited

// Complexities:
// Time => O(n * m^2), where n is the number of words in the word list and m is the length of the words
// Space => O(n * m^2), where n is the number of words in the word list and m is the length of the words

function ladderLength(
	beginWord: string,
	endWord: string,
	wordList: string[]
): number {
	if (!wordList.includes(endWord)) {
		return 0;
	}

	const nei = {};
	for (const word of [beginWord, ...wordList]) {
		for (let j = 0; j < word.length; ++j) {
			const pattern = word.substring(0, j) + "*" + word.substring(j + 1);
			if (!nei[pattern]) {
				nei[pattern] = [];
			}
			nei[pattern].push(word);
		}
	}

	const visited = new Set<string>([beginWord]);
	const queue = new Queue<string>();
	queue.push(beginWord);
	let ans = 1;
	while (!queue.isEmpty()) {
		const qLength = queue.size();
		for (let i = 0; i < qLength; i++) {
			const word = queue.pop()!;
			if (word === endWord) {
				return ans;
			}
			for (let j = 0; j < word.length; j++) {
				const pattern = word.slice(0, j) + "*" + word.slice(j + 1);
				for (const neiWord of nei[pattern]) {
					if (!visited.has(neiWord)) {
						visited.add(neiWord);
						queue.push(neiWord);
					}
				}
			}
		}
		ans++;
	}

	return 0;
}
