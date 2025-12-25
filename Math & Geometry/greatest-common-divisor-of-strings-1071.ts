// https://leetcode.com/problems/greatest-common-divisor-of-strings/

// TL;DR:
// Brute force trick is to get the smaller string and try all slices of it with length divisor of both initial strings:
//   - Get the smaller length string
//   - Iterateb backwards through it:
//      - If the current substring length is not a divisor of both initial strings, skip it
//      - Calculate the substring from the smaller string with the current length and the nummber of times it needs to be multiplied to match both strings lengths
//      - Check if the multiplied substring matches both initial strings and return it if it does
// Return an empty string if no common divisor is found

// Complexities:
// Time => O(min(n, m) * (n + m)), where n is the length of str1 and m is the length of str2
// Space => O(n + m), where n is the length of str1 and m is the length of str2

function gcdOfStrings(str1: string, str2: string): string {
	const l1 = str1.length;
	const l2 = str2.length;
	if (l2 > l1) {
		return gcdOfStrings(str2, str1);
	}

	for (let i = l2; i >= 1; i--) {
		if (l1 % i !== 0 || l2 % i !== 0) {
			continue;
		}

		const gcd = str2.slice(0, i);
		const times1 = l1 / i;
		const times2 = l2 / i;
		if (gcd.repeat(times1) === str1 && gcd.repeat(times2) === str2) {
			return gcd;
		}
	}

	return "";
}
