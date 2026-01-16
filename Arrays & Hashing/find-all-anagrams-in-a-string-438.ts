// https://leetcode.com/problems/find-all-anagrams-in-a-string/

// TL;DR:
// Count the frequency of p and use a sliding window to check if the current s window frequency matches the p frequency
// Iterate with right pointer:
//   - Increment the frequency of the current char in the s window frequency map
//   - If the current char is in p and the frequency matches, increment the matches counter
//   - If the current char is in p and the frequency was matching before but not anymore, decrement the matches counter
//   - If the window's length is equal to p's length:
//     - If the matches counter matches the target matches (unique chars in p), add the left pointer to the answer array
//     - Decrement the frequency of the leftmost char in the s window frequency map
//     - If the leftmost char is in p and the frequency matches, increment the matches counter
//     - If the leftmost char is in p and the frequency was matching before but not anymore, decrement the matches counter
//     - Increment the left pointer
// Return the answer array

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function findAnagrams(s: string, p: string): number[] {
	if (p.length > s.length) {
		return [];
	}

	const pMap = {};
	for (const c of p) {
		pMap[c] = (pMap[c] ?? 0) + 1;
	}
	const matchesTarget = Object.keys(pMap).length;

	const sMap = {};
	let left = 0;
	let matches = 0;
	const ans = [];
	for (let right = 0; right < s.length; right++) {
		sMap[s[right]] = (sMap[s[right]] ?? 0) + 1;
		if (pMap[s[right]] !== undefined) {
			if (sMap[s[right]] === pMap[s[right]]) {
				matches++;
			} else if (sMap[s[right]] - 1 === pMap[s[right]]) {
				matches--;
			}
		}

		const length = right - left + 1;
		if (length === p.length) {
			if (matches === matchesTarget) {
				ans.push(left);
			}

			sMap[s[left]]--;
			if (pMap[s[left]] !== undefined) {
				if (sMap[s[left]] === pMap[s[left]]) {
					matches++;
				} else if (sMap[s[left]] + 1 === pMap[s[left]]) {
					matches--;
				}
			}

			left++;
		}
	}

	return ans;
}
