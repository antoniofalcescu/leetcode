// https://leetcode.com/problems/combination-sum-ii/

// TL;DR:
// Use a backtracking approach to generate all combinations that sum up to the target
//   - Sort the input array to handle duplicates
//   - Left branch will always try to include the current element
//   - Right branch will always try to exclude the current element and move to the next unique element (skipping duplicates by incrementing the index until we find a different element)
//   - Recursively call the bkt function with the current index and the current sum (starting from 0)
//   - If we reached a solution (sum === target), push a copy of the current combination to the answer array and return
//   - If we exceeded the target or reached the end of the input array, return
//   - Otherwise, go through the 2 branches:
//     - Include the current element in the current subset and recursively call the bkt function with the next index and the sum incremented by the current element (left child of the decision tree)
//     - Exclude the current element from the current subset and recursively call the bkt function with the next unique index and the same sum (right child of the decision tree)

// Complexities:
// Time: O(n * 2^n), where n is the length of the input array
// Space: O(n), where n is the length of the input array

function combinationSum2(candidates: number[], target: number): number[][] {
	candidates.sort((a, b) => a - b);
	const ans: number[][] = [];
	const combination: number[] = [];

	function bkt(i: number, sum: number): void {
		if (sum === target) {
			ans.push([...combination]);
			return;
		}
		if (i === candidates.length || sum > target) {
			return;
		}

		combination.push(candidates[i]);
		bkt(i + 1, sum + candidates[i]);

		combination.pop();
		while (candidates[i] === candidates[i + 1]) {
			i++;
		}
		bkt(i + 1, sum);
	}

	bkt(0, 0);
	return ans;
}
