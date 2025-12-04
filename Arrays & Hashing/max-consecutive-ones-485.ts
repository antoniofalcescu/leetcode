// https://leetcode.com/problems/max-consecutive-ones/

// TL;DR:
// Just iterate through the array and increment ones counter when we have 1 or reset when we have 0
// Also, update the max counter

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function findMaxConsecutiveOnes(nums: number[]): number {
	let ones = 0;
	let maxOnes = 0;
	for (const num of nums) {
		if (num === 1) {
			ones++;
			maxOnes = Math.max(maxOnes, ones);
		} else {
			ones = 0;
		}
	}

	return maxOnes;
}
