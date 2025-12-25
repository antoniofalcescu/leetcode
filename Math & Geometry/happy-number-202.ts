// https://leetcode.com/problems/happy-number/

// TL;DR:
// Use a set to store the numbers we've seen
// While the number is not 1:
//   - If we've seen the number before, we are in a cycle and return false
//   - Add the number to the set
//   - Calculate the next number by squaring each digit and summing them up
// Return true

// Complexities:
// Time => O(log(n)), where n is the input number
// Space => O(log(n)), where n is the input number

function isHappy(n: number): boolean {
	const set = new Set<number>();
	while (n !== 1) {
		if (set.has(n)) {
			return false;
		}
		set.add(n);
		let newN = 0;
		while (n) {
			const digit = n % 10;
			newN += digit * digit;
			n = Math.floor(n / 10);
		}
		n = newN;
	}

	return true;
}
