// https://leetcode.com/problems/valid-palindrome-ii/

// TL;DR:
// Use two pointers to iterate through the string in parallel
// If we find a mismatch, we need to check if one of the 2 substrings are palindrome:
//   - Substring that skipped current left element or substring that skipped current right element
// We do this O(n) operation only once so the complexity is still O(n + n) = O(2 * n) = O(n)

// Complexities:
// Time => O(n), where n is the length of the string
// Space => O(1)

function isPalindrome(s: string, left: number, right: number): boolean {
	while (left < right) {
		if (s[left] !== s[right]) {
			return false;
		}
		left++;
		right--;
	}
	return true;
}

function validPalindrome(s: string): boolean {
	let [left, right] = [0, s.length - 1];
	while (left < right) {
		if (s[left] !== s[right]) {
			return (
				isPalindrome(s, left, right - 1) || isPalindrome(s, left + 1, right)
			);
		}

		left++;
		right--;
	}

	return true;
}
