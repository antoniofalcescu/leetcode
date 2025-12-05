// https://leetcode.com/problems/minimum-increment-to-make-array-unique/

// Hint:
// - Greedy approach, how would you handle it if the array was sorted?

// TL;DR:
// Sort the array and iterate through it:
//   - Add the difference between the previous number and the current number to the answer
//   - If the current number <= previous number, increment it to the previous number + 1
// Return the answer

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(1)

function minIncrementForUnique(nums: number[]): number {
	nums.sort((a, b) => a - b);
	let ans = 0;
	for (let i = 1; i < nums.length; i++) {
		if (nums[i] <= nums[i - 1]) {
			ans += nums[i - 1] - nums[i] + 1;
			nums[i] = nums[i - 1] + 1;
		}
	}

	return ans;
}
