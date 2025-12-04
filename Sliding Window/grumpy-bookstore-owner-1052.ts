// https://leetcode.com/problems/grumpy-bookstore-owner/

// Hint:
// - Split the problem into finding the maximum grumpy sum window and just adding the non grumpy values after

// TL;DR:
// Use 2 pointers (left and right) to iterate through the array and keep track of the max grumpy sum we found in a minutes length window (grumpy sum = sum of customers when grumpy)
// For each right pointer num:
//   - If the current right pointer is grumpy, add right pointer customers value to the grumpy sum and update the max grumpy sum if needed
//   - If the window size is equal to minutes, subtract the left pointer customers value from the grumpy sum and increment the left pointer
// Iterate once through the whole customers array and add the remaining customer values when owner is not grumpy

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function maxSatisfied(
	customers: number[],
	grumpy: number[],
	minutes: number
): number {
	let grumpySum = 0;
	let maxGrumpySum = 0;
	let left = 0;
	for (let right = 0; right < customers.length; right++) {
		if (grumpy[right]) {
			grumpySum += customers[right];
			maxGrumpySum = Math.max(maxGrumpySum, grumpySum);
		}
		if (right - left + 1 === minutes) {
			if (grumpy[left]) {
				grumpySum -= customers[left];
			}
			left++;
		}
	}

	for (let i = 0; i < customers.length; i++) {
		if (!grumpy[i]) {
			maxGrumpySum += customers[i];
		}
	}

	return maxGrumpySum;
}
