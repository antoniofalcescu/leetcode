// https://leetcode.com/problems/find-the-sequence-of-strings-appeared-on-the-screen/

// TL;DR:
// Use a greedy approach:
// Keep track of the current word and the answer array
// Iterate through the target string and for each character:
//   - Iterate through the alphabet and add the current word + letter to the answer array
//   - If the letter is the same as the current character, add the letter to the word and break the inner loop to start with the next character
// Return the answer array

// Complexities:
// Time => O(n * 26), where n is the length of the target string
// Space => O(n), where n is the length of the target string

function stringSequence(target: string): string[] {
	const letters = Array.from({ length: 26 }, (_, i) =>
		String.fromCharCode("a".charCodeAt(0) + i),
	);
	let word = "";
	const ans: string[] = [];
	for (const c of target) {
		for (const letter of letters) {
			ans.push(word + letter);
			if (letter === c) {
				word += letter;
				break;
			}
		}
	}

	return ans;
}
