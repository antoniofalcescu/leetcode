// https://leetcode.com/problems/minimum-string-length-after-balanced-removals/

// TL;DR:
// Iterate through the string and keep track of the number of 'a's and 'b's
// Return the absolute difference between the number of 'a's and 'b's

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function minLengthAfterRemovals(s: string): number {
	let a = 0;
	let b = 0;
	for (const c of s) {
		if (c === "a") {
			a++;
		} else {
			b++;
		}
	}

	return Math.abs(a - b);
}
