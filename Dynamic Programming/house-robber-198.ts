// https://leetcode.com/problems/house-robber/

// Hint:
// - DP bottom-up approach (Similar to Min Cost Climbing Stairs)

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize two variables to store the maximum amount of money that can be robbed for the current and previous step
//   - Iterate through the nums array and update the variables:
//     - The current rob amount is the max between the previous previous rob + current house and the immediately previous rob

// Complexities:
// Time => O(n), where n is the length of the nums array
// Space => O(1)

function rob(nums: number[]): number {
	let [rob1, rob2] = [0, 0];

	for (const num of nums) {
		const currRob = Math.max(rob1 + num, rob2);
		rob1 = rob2;
		rob2 = currRob;
	}

	return rob2;
}
