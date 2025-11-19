// https://leetcode.com/problems/combination-sum/

// TL;DR:
// Use a backtracking approach to generate all combinations that sum up to the target
//   - Left branch will always try to include the current element
//   - Right branch will always try to exclude the current element and move to the next index
//   - Recursively call the bkt function with the current index and the current sum (starting from 0)
//   - If we reached a solution (sum === target), push the current combination to the answer array and return
//   - If we exceeded the target or reached the end of the input array, return
//   - Otherwise, go through the 2 branches:
//     - Include the current element in the current subset and recursively call the bkt function with the same index and the sum incremented by the current element (left child of the decision tree)
//     - Exclude the current element from the current subset and recursively call the bkt function with the next index and the same sum (right child of the decision tree)

// Complexities:
// Time: O(n * 2^(t / min(candidates))), where n is the length of the input array and t is the target and min(candidates) is the minimum element in the input array
// Space: O(t / min(candidates)), where t is the target and min(candidates) is the minimum element in the input array

function combinationSum(candidates: number[], target: number): number[][] {
	const ans: number[][] = [];
	const combination: number[] = [];

	function bkt(i: number, sum: number): void {
		if (sum === target) {
			ans.push([...combination]);
			return;
		}
		if (sum > target || i === candidates.length) {
			return;
		}

		// left decision tree
		combination.push(candidates[i]);
		bkt(i, sum + candidates[i]);

		// right decision tree
		combination.pop();
		bkt(i + 1, sum);
	}

	bkt(0, 0);
	return ans;
}
