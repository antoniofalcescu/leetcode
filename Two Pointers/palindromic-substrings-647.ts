// https://leetcode.com/problems/palindromic-substrings/

// Hint:
// - Check palindromes by considering each character as the center of a potential palindrome (take into account odd/even scenarios)

// TL;DR:
// Iterate through the string and for each character:
//   - Use 2 pointers (left and right) to expand from the current character (center)
//   - While the characters at the left and right pointers are the same, increment the answer
//   - Repeat the process for the even length palindrome
// Return the number of palindromes found

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function countSubstrings(s: string): number {
	let ans = 0;
	let [left, right] = [-1, -1];
	for (let i = 0; i < s.length; i++) {
		[left, right] = [i, i];
		while (left >= 0 && right < s.length && s[left] === s[right]) {
			ans++;
			left--;
			right++;
		}

		[left, right] = [i, i + 1];
		while (left >= 0 && right < s.length && s[left] === s[right]) {
			ans++;
			left--;
			right++;
		}
	}

	return ans;
}
