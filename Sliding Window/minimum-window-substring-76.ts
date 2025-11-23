// https://leetcode.com/problems/minimum-window-substring/

// TL;DR:
// Use 2 frequency arrays to store the frequency of the characters in the string t and the characters in the current window while keeping track of the have/need values:
//   - have: the number of unique characters in the current window that are also in the string t
//   - need: the number of unique characters in the string t
// Use 2 pointers (left and right) to iterate through the string s
// Use a variable to store the minimum window length and the substring
// Iterate through the string s with the right pointer and:
//   - If the current right char is in t:
//     - Increment the frequency in the current window freq map of s and if it matches the frequency in the t freq map, increment the have variable
//   - While have is equal to need (solution is found), try shrinking the window with the left pointer:
//     - If the left char is in t, decrement the frequency in the current window freq map of s. If the values were matching previously, decrement the have variable

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1), as we have a fixed size of 26 for the frequency arrays

function minWindow(s: string, t: string): string {
	if (t.length > s.length) {
		return "";
	}

	const sFreq: Record<string, number> = {};
	const tFreq: Record<string, number> = {};
	for (const c of t) {
		tFreq[c] = (tFreq[c] ?? 0) + 1;
	}

	const need = Object.keys(tFreq).length;
	let have = 0;
	let left = 0;
	let [ans, ansLength] = ["", Infinity];

	for (let right = 0; right < s.length; right++) {
		const rightChar = s[right];
		if (tFreq[rightChar]) {
			sFreq[rightChar] = (sFreq[rightChar] ?? 0) + 1;
			if (sFreq[rightChar] === tFreq[rightChar]) {
				have++;
			}
		}
		while (have === need) {
			const length = right - left + 1;
			if (ansLength > length) {
				ansLength = length;
				ans = s.slice(left, right + 1);
			}
			const leftChar = s[left];
			if (tFreq[leftChar]) {
				if (sFreq[leftChar] === tFreq[leftChar]) {
					have--;
				}
				sFreq[leftChar]--;
			}
			left++;
		}
	}

	return ans;
}
