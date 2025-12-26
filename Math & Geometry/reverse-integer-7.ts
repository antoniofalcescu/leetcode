// https://leetcode.com/problems/reverse-integer/

// TL;DR:
// Use a while loop to iterate until x becomes 0:
//   - Get and remove the last digit of x
//   - Check if the answer is out of bounds (need to compare against MAX/MIN / 10 and take the last digit separately because of overflow)
//   - Add current digit to the answer
// Return the answer

// Complexities:
// Time => O(log(n)), where n is the input number
// Space => O(1)

function reverse(x: number): number {
	const MAX = Math.pow(2, 31) - 1;
	const MIN = Math.pow(2, 31) * -1;

	let ans = 0;
	while (x !== 0) {
		const digit = x % 10;
		x = Math.trunc(x / 10);

		if (ans > MAX / 10 || (ans === MAX / 10 && digit > MAX % 10)) {
			return 0;
		}
		if (ans < MIN / 10 || (ans === MIN / 10 && digit < MIN % 10)) {
			return 0;
		}

		ans = ans * 10 + digit;
	}

	return ans;
}
