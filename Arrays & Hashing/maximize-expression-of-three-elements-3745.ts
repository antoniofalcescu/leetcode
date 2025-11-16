// https://leetcode.com/problems/maximize-expression-of-three-elements/

// TL;DR:
// Keep 3 values - a, b (a > b) as the maximums and c as the minimum
// For each element, check against a, b, c:
//   - If the current element is less than c, update c
//   - If the current element is greater than a, update b and a
//   - If the current element is greater than b, update b
// Return a + b - c

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function maximizeExpressionOfThree(nums: number[]): number {
	let a = -Infinity;
	let b = -Infinity;
	let c = Infinity;
	for (const x of nums) {
		if (c > x) {
			c = x;
		}

		if (x > a) {
			b = a;
			a = x;
		} else if (x > b) {
			b = x;
		}
	}

	return a + b - c;
}
