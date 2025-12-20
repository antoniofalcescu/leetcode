// https://leetcode.com/problems/minimum-operations-to-have-distinct-elements/

// TL;DR:
// Use a hash set to store the numbers we've seen
// Iterate through the array from the end to the start:
//   - If the current number is in the hash set, return the number of removals based on the current index where the duplicate is found (remember we can remove 3 elements at a time)
//   - Otherwise, add the current number to the hash set
// Return 0

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the number of unique numbers in the input array

function minOperations(nums: number[]): number {
	const seen = new Set<number>();
	for (let i = nums.length - 1; i >= 0; i--) {
		if (seen.has(nums[i])) {
			return Math.ceil((i + 1) / 3);
		}
		seen.add(nums[i]);
	}

	return 0;
}
