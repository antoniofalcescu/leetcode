// https://leetcode.com/problems/word-break-ii/

// TL;DR:
// Use a backtracking approach
//   - Base case: if the index is equal to the length of the string, push a copy of the current combination to the answer array and return
//   - For each word in the wordDict:
//     - Check if the current substring length matches the word length and the substring is equal to the word
//     - If it is, add the word to the current combination and recursively call the bkt function with the next index
//     - Clean up the current combination by removing the last word

// Complexities:
// Time => O(m * 2^n), where n is the length of the string and m is the length of the wordDict;
// Space => O(n), where n is the length of the string

function wordBreak(s: string, wordDict: string[]): string[] {
	const ans: string[] = [];
	function bkt(i: number, curr: string[]): void {
		if (i === s.length) {
			ans.push(curr.join(" "));
			return;
		}

		for (const word of wordDict) {
			const sliced = s.slice(i, i + word.length);
			if (sliced === word) {
				curr.push(sliced);
				bkt(i + word.length, curr);
				curr.pop();
			}
		}
	}
	bkt(0, []);
	return ans;
}
