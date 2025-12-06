// https://leetcode.com/problems/largest-number/

// Hint:
// - Must be Greedy by comparing the possible concatenation combinations

// TL;DR:
// Use a greedy approach:
//   - Convert the numbers to strings
//   - Sort the strings in descending order using a custom comparator that checks whatever merged combination is greater
//   - Join the strings to form the largest number
//   - If the first character is '0', return '0' (edge case where all numbers are 0)

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function largestNumber(nums: number[]): string {
	const strs = nums.map((x) => x.toString());
	const result = strs
		.sort((a, b) => {
			if (b + a > a + b) {
				return 1;
			}
			return -1;
		})
		.join("");

	return result[0] === "0" ? "0" : result;
}
