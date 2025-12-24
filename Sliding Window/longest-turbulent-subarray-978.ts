// https://leetcode.com/problems/longest-turbulent-subarray/

// TL;DR:
// Use 2 pointers (left and right) for Sliding Window and a prev variable to store the previous comparison
// For each right pointer num:
//   - If the current number is greater than the previous number and the previous comparison is not greater than:
//     - Update the length with the current window size
//     - Increment the right pointer
//     - Set the previous comparison to greater than
//   - If the current number is less than the previous number and the previous comparison is not less than:
//     - Update the length with the current window size
//     - Increment the right pointer
//     - Set the previous comparison to less than
//   - Otherwise:
//     - If the current number is equal to the previous number, increment the right pointer (skip the current number)
//     - Set the left pointer to the right pointer - 1
//     - Set the previous comparison to empty
// Return the length

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function maxTurbulenceSize(arr: number[]): number {
	let length = 1;
	let [left, right] = [0, 1];
	let prev = "";
	while (right < arr.length) {
		if (arr[right - 1] > arr[right] && prev !== ">") {
			length = Math.max(length, right - left + 1);
			right++;
			prev = ">";
		} else if (arr[right - 1] < arr[right] && prev !== "<") {
			length = Math.max(length, right - left + 1);
			right++;
			prev = "<";
		} else {
			right = arr[right - 1] === arr[right] ? right + 1 : right;
			left = right - 1;
			prev = "";
		}
	}

	return length;
}
