// https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram/

// TL;DR:
// Use a frequency array to store the frequency of each character in the strings s and t
// Iterate through the frequency array and for each index:
//   - If the frequency of the character in s is greater than the frequency of the character in t, add the difference to the answer (only count if sFreq > tFreq to not double count the differences)
// Return the answer

// Complexities:
// Time => O(n), where n is the length of the input strings
// Space => O(1), as we have a fixed size of 26 for the frequency array

function getIdx(c: string): number {
	return c.charCodeAt(0) - "a".charCodeAt(0);
}

function minSteps(s: string, t: string): number {
	const sFreq = Array.from({ length: 26 }, () => 0);
	for (const c of s) {
		const idx = getIdx(c);
		sFreq[idx]++;
	}
	const tFreq = Array.from({ length: 26 }, () => 0);
	for (const c of t) {
		const idx = getIdx(c);
		tFreq[idx]++;
	}
	let ans = 0;
	for (let i = 0; i < 26; i++) {
		if (sFreq[i] > tFreq[i]) {
			ans += sFreq[i] - tFreq[i];
		}
	}

	return ans;
}
