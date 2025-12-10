// https://leetcode.com/problems/minimum-size-subarray-sum/

// TL;DR:
// Use a Sliding Window to iterate through the array and keep track of the sum of the current window
// WHile the sum is greater than or equal to the target:
//   - Update the minimum length with the current window size
//   - Subtract the left number from the sum and increment the left pointer
// Return the minimum length or 0 if no subarray is found

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function minSubArrayLen(target: number, nums: number[]): number {
	let length = Infinity;
	let left = 0;
	let sum = 0;
	for (let right = 0; right < nums.length; right++) {
		sum += nums[right];
		while (sum >= target) {
			length = Math.min(length, right - left + 1);
			sum -= nums[left];
			left++;
		}
	}

	return length === Infinity ? 0 : length;
}
