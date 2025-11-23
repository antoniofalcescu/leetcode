// https://leetcode.com/problems/sliding-window-maximum/

// TL;DR:
// Use a Monotonic decreasing deque to store the indices of the numbers in the current window
// Keep 2 left/right pointers for the Sliding Window
// Iterate through the nums array with the right pointer and:
//   - While the current right number is greater than the number at the last index of the deque, pop it to ensure we are always decreasing order
//   - Push the current right index to the back of thedeque
//   - If the left index is greater than the index at the front of the deque, pop the front of the deque (current window passed the index)
//   - If the window size is equal to k, push the number at the front of the deque to the answer array and increment the left pointer - this is the max of the current window because the deque is in decrasing order

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

import { Deque } from "@datastructures-js/deque";

function maxSlidingWindow(nums: number[], k: number): number[] {
	const deque = new Deque<number>();
	const ans = [];
	let left = 0;
	for (let right = 0; right < nums.length; right++) {
		while (!deque.isEmpty() && nums[right] > nums[deque.back()]) {
			deque.popBack();
		}
		deque.pushBack(right);

		if (left > deque.front()) {
			deque.popFront();
		}
		if (right - left + 1 === k) {
			const top = deque.front();
			ans.push(nums[top]);
			left++;
		}
	}

	return ans;
}
