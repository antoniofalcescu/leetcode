// https://leetcode.com/problems/jump-game/

// TL;DR:
// Use a greedy approach to check if we can reach the first index starting from the end
//   - Initialize a goal variable to the last index
//   - Iterate backwards through the nums array from the second to last index to the first
//   - If we can reach the goal from the current index, update the goal to the current index
// Return true if the goal is 0, otherwise false

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function canJump(nums: number[]): boolean {
	let goal = nums.length - 1;
	for (let i = nums.length - 2; i >= 0; i--) {
		if (i + nums[i] >= goal) {
			goal = i;
		}
	}
	return goal === 0;
}
