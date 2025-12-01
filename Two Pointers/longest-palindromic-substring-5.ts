// https://leetcode.com/problems/longest-palindromic-substring/

// Hint:
// - Check palindromes by considering each character as the center of a potential palindrome (take into accoutn odd/even scenarios)

// TL;DR:
// Iterate through the string and for each character:
//   - Use 2 pointers (left and right) to expand from the current character (center)
//   - While the characters at the left and right pointers are the same, update the answer with the longest palindrome found
//   - Repeat the process for the even length palindrome
// Return the substring of the longest palindrome found

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function longestPalindrome(s: string): string {
	let ansIdx = 0;
	let ansLength = 0;
	let [left, right]: [number, number] = [-1, -1];
	for (let i = 0; i < s.length; i++) {
		[left, right] = [i, i];
		while (left >= 0 && right < s.length && s[left] === s[right]) {
			if (right - left + 1 > ansLength) {
				ansIdx = left;
				ansLength = right - left + 1;
			}
			left--;
			right++;
		}

		[left, right] = [i, i + 1];
		while (left >= 0 && right < s.length && s[left] === s[right]) {
			if (right - left + 1 > ansLength) {
				ansIdx = left;
				ansLength = right - left + 1;
			}
			left--;
			right++;
		}
	}

	return s.slice(ansIdx, ansIdx + ansLength);
}
