// https://leetcode.com/problems/find-the-array-concatenation-value/

// Hint:
// - Trivial two pointers problem

// TL;DR:
// Use 2 pointers (left and right) to iterate through the array:
//   - If the left pointer is equal to the right pointer, add the number to the answer (last case where we have only one number left)
//   - Otherwise, concatenate the left number with the right number and add the concatenation to the answer (trick here is to use log10 to get the number of digits of the right number)
// Return the merged numbers

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function findTheArrayConcVal(nums: number[]): number {
	let [left, right] = [0, nums.length - 1];
	let ans = 0;
	while (left <= right) {
		if (left === right) {
			ans += nums[left];
		} else {
			const rightDigits = Math.trunc(Math.log10(nums[right]) + 1);
			const concatenation =
				nums[left] * Math.pow(10, rightDigits) + nums[right];
			ans += concatenation;
		}

		left++;
		right--;
	}

	return ans;
}
