// https://leetcode.com/problems/plus-one/

// TL;DR:
// Initialize a leftover variable to 0
// Iterate through the digits from right to left
//   - Update the leftover = (current digit + 1) / 10
//   - Update the current digit = (current digit + 1) % 10
//   - If the leftover is 0, break the loop (we don't need to carry over anymore)
// After the loop, if the leftover is 1, add a 1 to the beginning of the digits (we need to carry over)
// Return the digits array

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function plusOne(digits: number[]): number[] {
	let leftover = 0;
	for (let i = digits.length - 1; i >= 0; i--) {
		leftover = Math.floor((digits[i] + 1) / 10);
		digits[i] = (digits[i] + 1) % 10;
		if (leftover === 0) {
			break;
		}
	}
	if (leftover === 1) {
		digits.splice(0, 0, 1);
	}

	return digits;
}
