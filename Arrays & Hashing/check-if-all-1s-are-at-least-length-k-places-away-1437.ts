// https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away

// TL;DR:
// Keep track of continuous zeroes count (initialize with k to handle case where 1 is not the first element)
// For each num in the array:
//  - If it is 1, compare the number of current zeroes with k and either return or reset and continue
//  - If it is 0, just increment
// Return true if we didn't return false at any point

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function kLengthApart(nums: number[], k: number): boolean {
	let zeroes = k;
	for (const x of nums) {
		if (x === 1) {
			if (zeroes < k) {
				return false;
			}
			zeroes = 0;
		} else {
			zeroes++;
		}
	}

	return true;
}
