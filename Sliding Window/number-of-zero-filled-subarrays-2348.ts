// https://leetcode.com/problems/number-of-zero-filled-subarrays/

// TL;DR:
// Trivial Sliding Window problem where if we find a 0 we count the number of subarrays ending at that right pointer
// Initialize the left pointer to 0 and the answer to 0
// For each right pointer num:
//   - If num is 0, add the current subarray size to the answer (right - left + 1)
//   - Otherwise, set the left pointer to the right pointer + 1
// Return the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function zeroFilledSubarray(nums: number[]): number {
    let left = 0;
    let ans = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            ans += right - left + 1;
        } else {
            left = right + 1;
        }
    }

    return ans;
};