// https://leetcode.com/problems/roman-to-integer/

// TL;DR:
// Use a map to store the pairs of roman numerals and their numeric values
// Iterate through the string:
//   - If the current roman numeral is less than the next roman numeral, subtract the value of the current roman numeral from the total
//   - Otherwise, add the value of the current roman numeral to the total
// Return the total

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function romanToInt(s: string): number {
	const MAP = {
		I: 1,
		V: 5,
		X: 10,
		L: 50,
		C: 100,
		D: 500,
		M: 1000,
	};

	let num = 0;
	for (let i = 0; i < s.length; i++) {
		if (i + 1 < s.length && MAP[s[i]] < MAP[s[i + 1]]) {
			num -= MAP[s[i]];
		} else {
			num += MAP[s[i]];
		}
	}

	return num;
}
