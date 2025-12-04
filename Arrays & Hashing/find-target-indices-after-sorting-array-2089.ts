// https://leetcode.com/problems/find-target-indices-after-sorting-array/

// Hint:
// - Just visualize an example

// TL;DR:
// Iterate through the array and count the number of numbers less than the target and the number of numbers equal to the target
// Then, iterate through the number of equal numbers and add the indices (less + i) to the answer array
// Return the answer array

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function targetIndices(nums: number[], target: number): number[] {
	let less = 0;
	let equal = 0;
	for (const num of nums) {
		if (num < target) {
			less++;
		} else if (num === target) {
			equal++;
		}
	}

	const ans: number[] = [];
	for (let i = 0; i < equal; i++) {
		ans.push(less + i);
	}
	return ans;
}
