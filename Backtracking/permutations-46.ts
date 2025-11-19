// https://leetcode.com/problems/permutations/

// TL;DR:
// Use a backtracking approach
//   - Base case: if the input array is empty, return [[]] (permutation of an empty array)
//   - Recursively call the permute function with the input array without the first element
//   - For each permutation, insert the first element at every possible position in the current permutation, example:
//     - [[]] => [[3]]
//     - [[3]] => [[2,3], [3,2]]
//     - [[2,3], [3,2]] => [[1,2,3], [2,1,3], [2,3,1], [1,3,2], [3,1,2], [3,2,1]]

// Complexities:
// Time: O(n! * n^2), where n is the length of the input array
// Space: O(n! * n), where n is the length of the input array

function permute(nums: number[]): number[][] {
	if (nums.length === 0) {
		return [[]];
	}

	const permutations = permute(nums.slice(1));
	const ans: number[][] = [];
	for (const permutation of permutations) {
		for (let i = 0; i <= permutation.length; i++) {
			const copy = [...permutation];
			copy.splice(i, 0, nums[0]);
			ans.push(copy);
		}
	}

	return ans;
}
