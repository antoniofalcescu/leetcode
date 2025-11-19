// https://leetcode.com/problems/keep-multiplying-found-values-by-two/

// TL;DR:
// Use a set to store the unique numbers in the input array
// While the original number is in the set, multiply it by 2
// Return the original number

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function findFinalValue(nums: number[], original: number): number {
	const uniqueNums = new Set<number>(nums);
	while (uniqueNums.has(original)) {
		original *= 2;
	}

	return original;
}
