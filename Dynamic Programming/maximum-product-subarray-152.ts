// https://leetcode.com/problems/maximum-product-subarray/

// Hint:
// - Kadane's Algorithm, keep track of both min and max products and a general ans variable while iterating through the array (don't forget 0)

// TL;DR:
// Use Kadane's Algorithm:
//   - The answer variable is initialized with the maximum of the nums array (catch edge case where the max is only 1 number - only negative numbers in the array)
//   - Initialize two variables to store the current minimum and maximum product (initialized to 1)
//   - Iterate through the nums array:
//     - If the current number is 0, reset the current minimum and maximum product to 1
//     - Otherwise, update the current maximum and minimum products:
//       - The maximum will be max(prevMax * curr_num, prevMin * curr_num, curr_num) -> handles scenario where we keep the sign if the curr_num is positive
//       - The minimum will be min(prevMax * curr_num, prevMin * curr_num, curr_num) -> handles scenario where we swap the sign if the curr_num is negative
//       - If the current maximum is greater than the answer, update the answer

// Complexities:
// Time => O(n), where n is the length of the nums array
// Space => O(1)

function maxProduct(nums: number[]): number {
	let ans = Math.max(...nums);
	let [currMin, currMax] = [1, 1];
	for (const num of nums) {
		if (num === 0) {
			[currMin, currMax] = [1, 1];
		} else {
			const prevMax = currMax;
			currMax = Math.max(currMax * num, currMin * num, num);
			currMin = Math.min(prevMax * num, currMin * num, num);
			ans = Math.max(ans, currMax);
		}
	}
	return ans;
}
