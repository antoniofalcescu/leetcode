// https://leetcode.com/problems/subarray-product-less-than-k/

// TL;DR:
// Use 2 pointers (left and right) to iterate through the array and use a product variable to store the product of the current window
// For each right pointer num:
//   - Multiply the product by the current number
//   - While the product is greater than or equal to k, divide the product by the leftmost number and increment the left pointer (need to consider left and right relationship for endless loops)
//   - Add the current window size to the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function numSubarrayProductLessThanK(nums: number[], k: number): number {
	let ans = 0;
	let left = 0;
	let product = 1;
	for (let right = 0; right < nums.length; right++) {
		product *= nums[right];
		while (left <= right && product >= k) {
			product /= nums[left];
			left++;
		}
		ans += right - left + 1;
	}
	return ans;
}
