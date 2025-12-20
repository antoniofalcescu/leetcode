// https://leetcode.com/problems/sum-of-all-subset-xor-totals/

// TL;DR:
// Use a backtracking approach to generate all subsets and calculate the XOR of each subset
//   - Base case: If we reached the end of the input array, add the current XOR value to the total
//   - Left branch will include the current element and move to the next index
//   - Right branch will exclude the current element and move to the next index
// Return the total

// Complexities:
// Time => O(2^n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function subsetXORSum(nums: number[]): number {
	let total = 0;
	function bkt(i: number, xor: number): void {
		if (i === nums.length) {
			total += xor;
			return;
		}

		bkt(i + 1, xor ^ nums[i]);
		bkt(i + 1, xor);
	}
	bkt(0, 0);
	return total;
}
