// https://neetcode.io/problems/max-consecutive-ones-ii/question

// Hint:
//  - Keep track of the zeroes instead of the ones

// TL;DR:
// Use 2 pointers (left and right) for Sliding Window
// For each right pointer num:
//   - If num is 0, increment the zeroes count
//   - While the zeroes count is greater than 1, increment the left pointer and decrement zeroes if nums[left] was 0
//   - Update the max length with max(maxLength, current window size)

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

class MaxConsecutiveOnesIISolution {
	/**
	 * @param {number[]} nums
	 * @return {number}
	 */
	findMaxConsecutiveOnes(nums) {
		let maxLength = 0;
		let left = 0;
		let zeroes = 0;
		for (let right = 0; right < nums.length; right++) {
			if (nums[right] === 0) {
				zeroes++;
			}

			while (zeroes > 1) {
				if (nums[left] === 0) {
					zeroes--;
				}
				left++;
			}
			const length = right - left + 1;
			maxLength = Math.max(maxLength, length);
		}
		return maxLength;
	}
}
