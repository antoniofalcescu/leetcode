// https://leetcode.com/problems/sqrtx/

// TL;DR:
// Use a binary search to find the square root of the input number
// If the square root is found, return the square root
// If the square root is not found, return the square root of the number less than the input number (right pointer)

// Complexities:
// Time => O(log n), where n is the input number
// Space => O(1)

function mySqrt(x: number): number {
	let [left, right] = [0, x];
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		if (mid * mid === x) {
			return mid;
		}
		if (mid * mid < x) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return right;
}
