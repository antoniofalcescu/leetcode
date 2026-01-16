// https://leetcode.com/problems/maximum-width-ramp/

// TL;DR:
// Use a monotonic decreasing stack to store the indices of the numbers from left to right
// Iterate through the nums array from left to right:
//   - If the stack is empty or the number at the top of the stack is greater than the current number, push the current index to the stack
// Iterate through the nums array from right to left:
//   - While the stack is not empty and the number at the top of the stack is less than or equal to the current number, pop the stack and update the maxLength with the width
// Return the max length

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function maxWidthRamp(nums: number[]): number {
	const stk: number[] = [];
	for (let i = 0; i < nums.length; i++) {
		if (stk.length === 0 || nums[stk[stk.length - 1]] > nums[i]) {
			stk.push(i);
		}
	}

	let maxLength = 0;
	for (let i = nums.length - 1; i >= 0; i--) {
		while (stk.length && nums[stk[stk.length - 1]] <= nums[i]) {
			maxLength = Math.max(maxLength, i - stk[stk.length - 1]);
			stk.pop();
		}
		if (stk.length === 0) {
			break;
		}
	}

	return maxLength;
}
