// https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/

// TL;DR:
// Translate the problem into finding the longest subarray with sum = total - x (if it exists)
// Use a sliding window approach with left/right pointers, a sum and max length variable
// For each right pointer num:
//   - Add the current number to the sum
//   - While left <= right and sum > target, subtract the leftmost number from the sum and increment the left pointer
//   - If the sum is equal to the target, update the max length with the current window size if it's greater
// If we found a maxLength (not null), return length - maxLength, otherwise return -1

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function minOperations(nums: number[], x: number): number {
    const n = nums.length;
    const total = nums.reduce((acc, num) => acc + num, 0);
    const target = total - x;
    let left = 0;
    let sum = 0;
    let maxLength: number | null = null;
    for (let right = 0; right < n; right++) {
        sum += nums[right];
        while (left <= right && sum > target) {
            sum -= nums[left++];
        }
        if (sum === target) {
            maxLength = Math.max(maxLength, right - left + 1);
        }
    }

    return maxLength === null ? -1 : n - maxLength;
};