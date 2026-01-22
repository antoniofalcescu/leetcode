// https://leetcode.com/problems/frequency-of-the-most-frequent-element/

// Hint:
// - Sort and visualize windows of elements

// TL;DR:
// Sort the array and use Sliding Window approach to find the longest subarray where the difference sum between elements <= k
// Initialize left = 0, maxLength = 1 and diff = 0 and run a for loop with the right pointer from the second element to the end:
//   - Calculate the current difference to make all previous elements in the window equal to the current element and add it to the total difference
//     - (nums[right] - nums[right - 1]) * (right - left)
//   - While the total difference is greater than k, substract the current nums[right] - nums[left] from the total difference and increment the left pointer
//   - Update the maximum length with max(maxLength, right - left + 1)
// Return the maximum length

// Complexities:
// Time => O(n log n), where n is the length of the input array
// Space => O(1)

function maxFrequency(nums: number[], k: number): number {
	nums.sort((a, b) => a - b);
	let left = 0;
	let maxLength = 1;
	let diff = 0;
	for (let right = 1; right < nums.length; right++) {
		const currDiff = (nums[right] - nums[right - 1]) * (right - left);
		diff += currDiff;
		while (diff > k) {
			diff -= nums[right] - nums[left];
			left++;
		}

		maxLength = Math.max(maxLength, right - left + 1);
	}

	return maxLength;
}
