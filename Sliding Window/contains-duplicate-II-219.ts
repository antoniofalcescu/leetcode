// https://leetcode.com/problems/contains-duplicate-ii/

// TL;DR:
// Use a set to store the numbers in the current window
// Use Sliding Window to iterate with a left-right window of size k while keeping track of the numbers in the set
// If the current number is in the set, return true
// Otherwise, add the current number to the set and if our window reached k, remove the left number from the set and increment the left pointer
// Return false

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(k), where k is the size of the window

function containsNearbyDuplicate(nums: number[], k: number): boolean {
	const uniques = new Set<Number>();
	let left = 0;
	for (let right = 0; right < nums.length; right++) {
		if (uniques.has(nums[right])) {
			return true;
		}
		uniques.add(nums[right]);
		if (right - left === k) {
			uniques.delete(nums[left]);
			left++;
		}
	}

	return false;
}
