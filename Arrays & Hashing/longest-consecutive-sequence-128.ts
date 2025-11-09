// https://leetcode.com/problems/longest-consecutive-sequence/

// TL;DR:
// Use a set to store the unique numbers in the input array
// Use a starting points array to store the numbers that don't have a number - 1 in the set
// Iterate through the starting points array and for each number:
//   - iterate until the chain of consecutive numbers is broken (i.e. the number + length is not in the set)
//   - update the max length
// Return the max length

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function longestConsecutive(nums: number[]): number {
	const uniqueNums = new Set(nums);
	const startingPoints = Array.from(
		new Set(nums.filter((x) => !uniqueNums.has(x - 1)))
	);

	let maxLength = 0;
	for (const x of startingPoints) {
		let currLength = 1;
		while (uniqueNums.has(x + currLength)) {
			currLength++;
		}

		maxLength = Math.max(maxLength, currLength);
	}

	return maxLength;
}
