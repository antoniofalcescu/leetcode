// https://leetcode.com/problems/max-consecutive-ones-iii/

// TL;DR:
// Use 2 pointers (left and right) for Sliding Window
// For each right pointer num:
//   - If num is 0, increment the zeroes count
//   - While the zeroes count is greater than k, increment the left pointer and decrement zeroes if nums[left] was 0
//   - Update the max length with max(maxLength, current window size)

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function longestOnes(nums: number[], k: number): number {
	let left = 0;
	let ans = 0;
	let zeroes = 0;
	for (let right = 0; right < nums.length; right++) {
		if (nums[right] === 0) {
			zeroes++;
		}

		while (zeroes > k) {
			if (nums[left] === 0) {
				zeroes--;
			}
			left++;
		}

		const length = right - left + 1;
		ans = Math.max(ans, length);
	}

	return ans;
}
