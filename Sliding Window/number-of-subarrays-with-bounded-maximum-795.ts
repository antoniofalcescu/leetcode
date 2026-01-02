// https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/

// TL;DR:
// Use 2 pointers (l and r) to iterate through the array and use a small variable to store the number of contigous values that are less than left
// For each right pointer num:
//   - If num is greater than right, set the left pointer to the right pointer + 1
//   - If num is less than left, increment the small variable
//   - Otherwise, reset the small variable to 0
//   - Calculate the current subarray size minus the small variable and add it to the answer (remember to not go negative)
//   - Add the current subarray size to the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function numSubarrayBoundedMax(nums: number[], left: number, right: number): number {
    let l = 0;
    let small = 0;
    let ans = 0;
    for (let r = 0; r < nums.length; r++) {
        if (nums[r] > right) {
            l = r + 1;
            continue;
        }

        if (nums[r] < left) {
            small++;
        } else {
            small = 0;
        }

        const current = Math.max(0, (r - l + 1) - small);
        ans += current;
    }

    return ans;
};