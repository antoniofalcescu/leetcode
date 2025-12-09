// https://leetcode.com/problems/sort-colors/

// Hint:
// - Must iterate with pointers if we want only 1 pass

// TL;DR:
// Use a two-pointer approach to sort the array in one pass:
//   - Use a pointer to iterate through the array and a left pointer to track the position of the next 0 and a right pointer to track the position of the next 2
//   - If the current element is 2, swap it with the element at the right pointer and decrement the right pointer and NOT increment the i pointer
//   - If the current element is 0, swap it with the element at the left pointer and increment the left pointer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function sortColors(nums: number[]): void {
	let [i, left, right] = [0, 0, nums.length - 1];
	while (i <= right) {
		if (nums[i] === 2) {
			[nums[i], nums[right]] = [nums[right], nums[i]];
			right--;
		} else {
			if (nums[i] === 0) {
				[nums[i], nums[left]] = [nums[left], nums[i]];
				left++;
			}
			i++;
		}
	}
}
