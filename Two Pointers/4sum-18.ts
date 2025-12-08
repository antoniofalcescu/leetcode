// https://leetcode.com/problems/4sum/

// Hint:
// - 3Sum with one extra loop basically (remember to skip duplicates)

// TL;DR:
// Sort the input array
// Idea is to form quadruplets by fixing 2 elements and using 2 left-right pointers to find the target sum
//   - For each loop, remember to skip duplicates by checking if the current element is equal to the previous one
// Iterate with the 2 pointers in another loop and calculate the sum of the quadruplet
// If the sum is equal to the target, add the quadruplet to the answer array and skip duplicates with the left pointer
// Otherwise, decide to increment left or decrement right pointer based on the sum and the target

// Complexities:
// Time => O(n^3), where n is the length of the input array
// Space => O(1)

function fourSum(nums: number[], target: number): number[][] {
	nums.sort((a, b) => a - b);

	const ans: number[][] = [];
	for (let i = 0; i < nums.length - 3; i++) {
		if (i > 0 && nums[i] === nums[i - 1]) {
			continue;
		}
		for (let j = i + 1; j < nums.length - 2; j++) {
			if (j > i + 1 && nums[j] === nums[j - 1]) {
				continue;
			}
			let [left, right] = [j + 1, nums.length - 1];
			while (left < right) {
				const sum = nums[i] + nums[j] + nums[left] + nums[right];
				if (sum === target) {
					ans.push([nums[i], nums[j], nums[left], nums[right]]);
					left++;
					while (left < right && nums[left] === nums[left - 1]) {
						left++;
					}
				} else if (sum > target) {
					right--;
				} else {
					left++;
				}
			}
		}
	}

	return ans;
}
