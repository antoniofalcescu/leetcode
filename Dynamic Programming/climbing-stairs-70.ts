// https://leetcode.com/problems/climbing-stairs/

// Hint:
// - DP bottom-up approach

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize two variables to store the number of ways to climb the stairs for the current and previous step
//   - Iterate through the stairs and update the variables:
//     - The current step is the sum of the current and previous step
//     - The previous step is the current step
//   - Return the current step

// Complexities:
// Time => O(n), where n is the number of stairs
// Space => O(1)

function climbStairs(n: number): number {
	let [one, two] = [1, 1];
	for (let i = 0; i < n - 1; i++) {
		[one, two] = [one + two, one];
	}
	return one;
}
