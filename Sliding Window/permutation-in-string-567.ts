// https://leetcode.com/problems/permutation-in-string/

// TL;DR:
// Basically, we want to have 2 freq arrays and constantly check the fixed s1.length windows to see if they match the frequencies of all 26 characters in both s1 and s2 arrays
// Initialize 2 frequency arrays of size 26 to store the frequency of the first s1.length characters of s1 and s2
// Initialize the number of matches from the first s1.length window
// Iterate with both pointers in fixed window size and:
//   - If the current window matches all 26 characters, return true
//   - Increment the frequency of the right pointer char and update matches accordingly if the new frequence of s2[right] is now equal or changed and previously was equal
//   - Decrement the frequency of the left pointer char and update matches accordingly if the new frequence of s2[left] is now equal or changed and previously was equal
// Return true if the number of matches is equal to 26 (last window matches)

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1), as we have a fixed size of 26 for the frequency array

function checkInclusion(s1: string, s2: string): boolean {
	if (s1.length > s2.length) {
		return false;
	}

	const s1Count = Array.from({ length: 26 }, () => 0);
	const s2Count = Array.from({ length: 26 }, () => 0);

	for (let i = 0; i < s1.length; i++) {
		s1Count[s1.charCodeAt(i) - "a".charCodeAt(0)]++;
		s2Count[s2.charCodeAt(i) - "a".charCodeAt(0)]++;
	}

	let matches = 0;
	for (let i = 0; i < 26; i++) {
		if (s1Count[i] === s2Count[i]) {
			matches++;
		}
	}

	let left = 0;
	for (let right = s1.length; right < s2.length; right++) {
		if (matches === 26) {
			return true;
		}

		const rightIdx = s2[right].charCodeAt(0) - "a".charCodeAt(0);
		s2Count[rightIdx]++;
		if (s1Count[rightIdx] === s2Count[rightIdx]) {
			matches++;
		} else if (s1Count[rightIdx] + 1 === s2Count[rightIdx]) {
			matches--;
		}

		const leftIdx = s2[left].charCodeAt(0) - "a".charCodeAt(0);
		s2Count[leftIdx]--;
		if (s1Count[leftIdx] === s2Count[leftIdx]) {
			matches++;
		} else if (s1Count[leftIdx] - 1 === s2Count[leftIdx]) {
			matches--;
		}

		left++;
	}

	return matches === 26;
}
