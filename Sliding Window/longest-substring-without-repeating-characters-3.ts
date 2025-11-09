// https://leetcode.com/problems/longest-substring-without-repeating-characters/

// TL;DR:
// Use 2 pointers (left and right) to iterate through the string and use a set to store the characters in the current substring
// While the current character is in the set, remove the leftmost character from the set and increment the left pointer
// Add the current character to the set and update the max length with max(maxLength, seq.size)

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(min(m, n)), where m is the size of the character set (26 for lowercase English letters)

function lengthOfLongestSubstring(s: string): number {
	let maxLength = 0;
	let left = 0;
	const seq = new Set();
	for (let right = 0; right < s.length; right++) {
		while (seq.has(s[right])) {
			seq.delete(s[left]);
			left++;
		}

		seq.add(s[right]);
		maxLength = Math.max(maxLength, seq.size);
	}

	return maxLength;
}
