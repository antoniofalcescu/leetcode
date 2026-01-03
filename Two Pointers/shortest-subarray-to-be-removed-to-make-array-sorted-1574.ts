// https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted/

// TL;DR:
// Basically we want to find 2 subarrays (prefix and suffix) both sorted in non-decreasing order and then check the minimum way to merge them into a single sorted array
// Find the prefix array with a simple iteration (handle edge case if all array is sorted and early return 0)
// Find the suffix array with a simple iteration
// Initialze the answer variable with the minimum of removing everything before the suffix or everything after the prefix
// Use 2 pointers (left and right) to iterate through the 2 subarrays:
//   - If the current prefix number <= current suffix number, update the answer with the length of the (left, right) subarray (both ends non inclusive) and increment the left pointer
//         - This means we can merge the 2 subarrays at the current indices if we remove everything between them (possible answer if this is the minimum length)
//   - Otherwise, increment the right pointer
// Return the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function findLengthOfShortestSubarray(arr: number[]): number {
	const n = arr.length;
	let i = 0;
	while (i + 1 < n && arr[i] <= arr[i + 1]) {
		i++;
	}
	if (i === n - 1) {
		return 0;
	}

	let j = n - 1;
	while (arr[j - 1] <= arr[j]) {
		j--;
	}

	const removeBeforeSuffix = j;
	const removeAfterPrefix = n - i - 1;
	let ans = Math.min(removeBeforeSuffix, removeAfterPrefix);

	let [left, right] = [0, j];
	while (left <= i && right < n) {
		if (arr[left] <= arr[right]) {
			ans = Math.min(ans, right - left - 1);
			left++;
		} else {
			right++;
		}
	}

	return ans;
}
