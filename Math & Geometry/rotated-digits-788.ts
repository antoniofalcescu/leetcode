// https://leetcode.com/problems/rotated-digits/

// Hint:
// - Bruteforce

// TL;DR:
// Iterate through the numbers from 1 to n and check if the current number is valid:
//   - If the current number contains an invalid digit (3, 4, 7), it's not a valid rotated number
//   - If the current number contains a valid digit (2, 5, 6, 9), it's a valid rotated number
//   - If the current number contains both valid and invalid digits, it's not a valid rotated number
// Return the number of valid rotated numbers

// Complexities:
// Time => O(n * log(m)), where n is the input number and m is the maximum number of digits in the input number
// Space => O(1)

function rotatedDigits(n: number): number {
	let ans = 0;
	const invalid = new Set<number>([3, 4, 7]);
	const valid = new Set<number>([2, 5, 6, 9]);

	for (let i = 1; i <= n; i++) {
		let num = i;
		let isValid = false;
		while (num > 0) {
			const digit = num % 10;
			if (invalid.has(digit)) {
				isValid = false;
				break;
			}
			if (valid.has(digit)) {
				isValid = true;
			}

			num = Math.trunc(num / 10);
		}

		if (isValid) {
			ans++;
		}
	}
	return ans;
}
