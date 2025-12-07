// https://leetcode.com/problems/next-greater-element-i/

// Hint:
// - Think how to efficiently access the next greater element for a given number in nums2

// TL;DR:
// Initialize a map of uniques nums in nums1 and their indices for fast lookup
// Iterate backwards through the nums2 array and use a monotonic decreasing stack to keep track of the next greater element
//   - While the stack is not empty and the top of the stack is less than or equal to the current element, pop the stack
//   - If the stack is not empty, set the next greater element for the current index in the answer array to the top of the stack (using the map of uniques)
//   - Push the current element to the stack
// Return the answer array

// Complexities:
// Time => O(n), where n is the length of the input arrays
// Space => O(n), where n is the length of the input arrays

function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
	const stack: number[] = [];
	const uniques: Record<number, number> = {};
	for (let i = 0; i < nums1.length; i++) {
		uniques[nums1[i]] = i;
	}
	const ans = Array.from({ length: nums1.length }, () => -1);
	for (let i = nums2.length - 1; i >= 0; i--) {
		const num = nums2[i];
		while (stack.length && stack[stack.length - 1] <= num) {
			stack.pop();
		}
		const max = stack[stack.length - 1];
		const idx = uniques[num];
		if (max !== undefined && idx !== undefined) {
			ans[idx] = max;
		}
		stack.push(num);
	}

	return ans;
}
