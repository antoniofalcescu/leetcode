// https://leetcode.com/problems/subsets-ii/

// TL;DR:
// Use a backtracking approach
//   - Sort the input array to handle duplicates
//   - Left branch will always try to include the current element
//   - Right branch will always try to exclude the current element and move to the next unique element (skipping duplicates by incrementing the index until we find a different element)
//   - Recursively call the bkt function with the current index (starting from 0)
//   - If we reached a solution (index is equal to the length of the input array), push a copy of the current subset to the answer array and return
//   - Otherwise, go through the 2 branches:
//     - Include the current element in the current subset and recursively call the bkt function with the next index (left child of the decision tree)
//     - Exclude the current element from the current subset and recursively call the bkt function with the next unique index (right child of the decision tree)

// Complexities:
// Time: O(n * 2^n), where n is the length of the input array
// Space: O(n), where n is the length of the input array

function subsetsWithDup(nums: number[]): number[][] {
	nums.sort((a, b) => a - b);
	const ans: number[][] = [];
	const subset: number[] = [];

	function bkt(i: number): void {
		if (i === nums.length) {
			ans.push([...subset]);
			return;
		}

		// left tree
		subset.push(nums[i]);
		bkt(i + 1);

		//right tree
		subset.pop();
		while (nums[i] === nums[i + 1]) {
			i++;
		}
		bkt(i + 1);
	}

	bkt(0);
	return ans;
}
