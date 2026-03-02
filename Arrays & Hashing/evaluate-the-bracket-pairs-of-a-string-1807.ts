// https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string/

// TL;DR:
// Use a hash map to store the knowledge pairs
// Keep track of the current answer string
// Iterate through the string with an index:
//   - If we find a opening bracket, loop until we reach the closing bracket and keep track of the word key between the brackets, add the knowledge value to the answer or ? if the key is not found
//   - Otherwise, add the character to the answer
// Return the answer

// Complexities:
// Time => O(n + k), where n is the length of the input string and k is the number of knowledge pairs
// Space => O(k + m), where k is the number of knowledge pairs and m is the length of the output string

function evaluate(s: string, knowledge: string[][]): string {
	const knowledgeMap: Record<string, string> = {};
	for (const [key, val] of knowledge) {
		knowledgeMap[key] = val;
	}

	let ans = "";
	for (let i = 0; i < s.length; i++) {
		if (s[i] === "(") {
			i++;
			let key = "";
			while (s[i] !== ")") {
				key += s[i];
				i++;
			}
			ans += knowledgeMap[key] ?? "?";
		} else {
			ans += s[i];
		}
	}

	return ans;
}
