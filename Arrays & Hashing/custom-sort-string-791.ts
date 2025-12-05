// https://leetcode.com/problems/custom-sort-string/

// Hint:
// - Count the number of characters is the s string and use the order to find the order to append them

// TL;DR:
// Use a hash map to store the frequency of each character in the string s
// Iterate through the order string and for each character:
//   - If the character is in the freq map, add it to the answer string the number of times it appears in the freq map
//   - Delete the character from the freq map
// Iterate through the freq map and for each character:
//   - Add it to the answer string the number of times it appears in the freq map
// Return the answer string

// Complexities:
// Time => O(n + m), where n is the length of the input string s and m is the length of the input string order
// Space => O(1), because all maps are of fixed size (26)

function customSortString(order: string, s: string): string {
	const sFreq: Record<string, number> = {};
	for (const c of s) {
		sFreq[c] = (sFreq[c] ?? 0) + 1;
	}

	let ans = "";
	for (const c of order) {
		if (sFreq[c]) {
			ans += c.repeat(sFreq[c]);
			delete sFreq[c];
		}
	}
	for (const [c, freq] of Object.entries(sFreq)) {
		ans += c.repeat(freq);
	}

	return ans;
}
