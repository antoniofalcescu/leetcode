// https://leetcode.com/problems/split-array-largest-sum/

// Hint:
// - Think of the limits of the sum as the answer and how to efficiently check if a limit is valid or not and move to ther possible limits

// TL;DR:
// Trick here is to visualize the limits of the possible answers and use Binary Search to check the mid of min/max limits
// Use a helper function to check if we can split the array into k subarrays with the given target sum (using the sum and resetting it when we overflow the target)

// Complexities:
// Time => O(n * log(sum(n))), where n is the length of the input array and sum(n) is the sum of the input array

function canSplit(nums: number[], k: number, target: number): boolean {
	let splits = 0;
	let sum = 0;
	for (const num of nums) {
		if (sum + num > target) {
			splits++;
			sum = 0;
		}
		sum += num;
	}

	if (sum) {
		splits++;
	}

	return splits <= k;
}

function splitArray(nums: number[], k: number): number {
	let min = Math.max(...nums);
	let max = nums.reduce((acc, num) => acc + num, 0);
	let ans = max;

	while (min <= max) {
		const mid = Math.floor((min + max) / 2);

		if (canSplit(nums, k, mid)) {
			ans = mid;
			max = mid - 1;
		} else {
			min = mid + 1;
		}
	}

	return ans;
}
