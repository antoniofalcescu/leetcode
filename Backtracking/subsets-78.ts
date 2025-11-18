// https://leetcode.com/problems/subsets/

// TL;DR:
// Use a backtracking approach to generate all subsets with a current subset array
//   - Recursively call the bkt function with the next index (starting from 0)
//   - If the index is equal to the length of the input array, push the current subset to the answer array and return (reached a leaf of the decision tree)
//   - Otherwise, include the current element in the current subset and recursively call the bkt function with the next index (left child of the decision tree)
//   - Then, exclude the current element from the current subset and recursively call the bkt function with the next index (right child of the decision tree)
// Return the answer array

// Complexities:
// Time: O(n * 2^n), where n is the length of the input array
// Space: O(n), where n is the length of the input array

function subsets(nums: number[]): number[][] {
	const ans: number[][] = [];

	const curr: number[] = [];
	function bkt(i: number): void {
		if (i === nums.length) {
			ans.push([...curr]);
			return;
		}

		// include nums[i] tree
		curr.push(nums[i]);
		bkt(i + 1);

		// don't include nums[i] tree
		curr.pop();
		bkt(i + 1);
	}

	bkt(0);
	return ans;
}
