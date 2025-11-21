// https://leetcode.com/problems/unique-length-3-palindromic-subsequences/

// TL;DR:
// Use a hash map to store the start and end index of each character in the string
// Iterate through the hash map and for each character:
//   - Get the start and end index
//   - Create a set of the unique characters between the start and end index
//   - Add the size of the set to the answer (number of palindromes for the current start/end fixed points)

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1), because all sets and maps are of fixed size (26)

function countPalindromicSubsequence(s: string): number {
	const map: Record<string, { start: number; end: number }> = {};
	for (let i = 0; i < s.length; i++) {
		if (!map[s[i]]) {
			map[s[i]] = { start: i, end: i };
		}
		map[s[i]].end = i;
	}

	let ans = 0;
	for (const c of Object.keys(map)) {
		const { start, end } = map[c];
		const uniques = new Set(s.slice(start + 1, end));
		ans += uniques.size;
	}

	return ans;
}
