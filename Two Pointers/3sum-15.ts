// https://leetcode.com/problems/3sum/

// TL;DR:
// Sort the input array and iterate through it by fixing each nums[i] as the first element of the triplet and use 2 pointers (left and right) to find the target sum
// After first triplet, skip duplicates by checking if the current element is equal to the previous one
// If the sum is equal to 0, add the triplet to the answer array and increment the left pointer and skip duplicates by checking if the current element is equal to the previous one
// If the sum is greater than 0, decrement the right pointer
// If the sum is less than 0, increment the left pointer

// Complexities:
// Time => O(n^2), where n is the length of the input array
// Space => O(1)

function threeSum(nums: number[]): number[][] {
	const ans: number[][] = [];
	nums.sort((a, b) => a - b);
	for (let i = 0; i < nums.length - 2; i++) {
		if (i > 0 && nums[i] === nums[i - 1]) {
			continue;
		}

		let left = i + 1;
		let right = nums.length - 1;
		while (left < right) {
			const sum = nums[i] + nums[left] + nums[right];
			if (sum === 0) {
				ans.push([nums[i], nums[left], nums[right]]);
				left++;
				while (nums[left] === nums[left - 1] && left < right) {
					left++;
				}
			} else if (sum > 0) {
				right--;
			} else {
				left++;
			}
		}
	}

	return ans;
}
