// https://leetcode.com/problems/valid-parenthesis-string/

// TL;DR:
// Use 2 variables to track the minimum and maximum possible number of open parentheses
// Iterate through the string and:
//   - If the current character is an open parenthesis, increment both variables
//   - If the current character is a close parenthesis, decrement both variables
//   - If the current character is a star, decrement the minimum variable and increment the maximum variable
//   - If the maximum number of open parentheses is less than 0, return false (we reached a case where ) is before ( in the string)
//   - Update the minimum variable to 0 if it's less than 0 (handles cases like (*)( )
//   - Return true if the minimum number of open parentheses is equal to 0

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function checkValidString(s: string): boolean {
	let openMin = 0;
	let openMax = 0;
	for (const c of s) {
		if (c === "(") {
			openMin++;
			openMax++;
		} else if (c === ")") {
			openMin--;
			openMax--;
		} else {
			openMin--;
			openMax++;
		}
		if (openMax < 0) {
			return false;
		}
		openMin = Math.max(openMin, 0);
	}

	return openMin === 0;
}
