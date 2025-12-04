// https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/

// Hint:
// - Classic Sliding Window problem, only trick to check the sum and not the average by multiplying the threshold by k

// TL;DR:
// Use 2 pointers (left and right) to iterate through the array and use a sum variable to store the sum of the current window
// For each right pointer num:
//   - Add the current number to the sum
//   - If the window size is equal to k, check if the sum is greater than or equal to the target and increment the answer if it is
//   - Subtract the leftmost number from the sum and increment the left pointer
// Return the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function numOfSubarrays(arr: number[], k: number, threshold: number): number {
	const target = threshold * k;

	let ans = 0;
	let sum = 0;
	let left = 0;
	for (let right = 0; right < arr.length; right++) {
		sum += arr[right];
		if (right - left + 1 === k) {
			if (sum >= target) {
				ans++;
			}
			sum -= arr[left++];
		}
	}

	return ans;
}
