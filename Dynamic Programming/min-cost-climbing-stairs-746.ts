// https://leetcode.com/problems/min-cost-climbing-stairs/

// Hint:
// - DP bottom-up approach, draw Decision Tree if needed, go with DP array and then optimize to O(1) space

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize two DP variables to store the cost of the i + 1 and i + 2 steps
//   - Iterate through the cost array backwards (excluding last step which is i + 1):
//     - The current DP variable is the cost of the current step + minimum of the two DP variables
//     - Shift the DP variables to the left: dp2 = dp1; dp1 = currDp;
//   - Return the minimum of the two DP variables

// Complexities:
// Time => O(n), where n is the length of the cost array (we iterate through the cost array once)
// Space => O(1), since we only use two variables to store the DP values

function minCostClimbingStairs(cost: number[]): number {
	let [dp1, dp2] = [cost[cost.length - 1], 0];
	for (let i = cost.length - 2; i >= 0; i--) {
		const currDp = cost[i] + Math.min(dp1, dp2);
		dp2 = dp1;
		dp1 = currDp;
	}

	return Math.min(dp1, dp2);
}
