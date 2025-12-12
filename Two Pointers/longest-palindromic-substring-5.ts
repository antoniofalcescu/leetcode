// https://leetcode.com/problems/longest-palindromic-substring/

// Hint:
// - Check palindromes by considering each character as the center of a potential palindrome (take into account odd/even scenarios)

// TL;DR:
// Iterate through the string and for each character:
//   - Use 2 pointers (left and right) to expand from the current character (center)
//   - While the characters at the left and right pointers are the same, update the answer with the longest palindrome found
//   - Repeat the process for the even length palindrome
// Return the substring of the longest palindrome found

// Complexities:
// Time => O(n^2), where n is the length of the input string
// Space => O(1)

function expandPalindrome(
	s: string,
	left: number,
	right: number
): [number, number] {
	while (left >= 0 && right < s.length && s[left] === s[right]) {
		left--;
		right++;
	}

	return [left + 1, right - left - 1];
}

function longestPalindrome(s: string): string {
	let [start, length] = [0, 1];

	for (let i = 0; i < s.length; i++) {
		let [currStart, currLength] = expandPalindrome(s, i, i);
		if (currLength > length) {
			start = currStart;
			length = currLength;
		}

		[currStart, currLength] = expandPalindrome(s, i - 1, i);
		if (currLength > length) {
			start = currStart;
			length = currLength;
		}
	}

	return s.slice(start, start + length);
}
