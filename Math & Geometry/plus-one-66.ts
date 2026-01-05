// https://leetcode.com/problems/plus-one/

// TL;DR:
// Initialize a leftover variable to 1
// Iterate through the digits from right to left while we have a leftover"
//   - Add the leftover to the current digit
//   - Update the leftover with the result of current digit divided by 10
//   - Update the current digit with the result of current digit modulo 10
//   - Decrement the index
// After the loop, if the leftover is not 0, add it to the beginning of the digits
// Return the digits array

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function plusOne(digits: number[]): number[] {
	let i = digits.length - 1;
	let leftover = 1;
	while (i >= 0 && leftover > 0) {
		digits[i] += leftover;
		leftover = Math.floor(digits[i] / 10);
		digits[i] %= 10;
		i--;
	}

	if (leftover) {
		digits.splice(0, 0, leftover);
	}

	return digits;
}
