// https://leetcode.com/problems/min-cost-climbing-stairs/

// Hint:
// - DP bottom-up approach

// TL;DR:
// Use a DP bottom-up approach
//   - Iterate through the cost array backwards and update the cost for the current step:
//     - The current step is the minimum of the current step plus the next step and the current step plus the step after that
//   - Return the minimum of the first and second step

// Complexities:
// Time => O(n), where n is the length of the cost array
// Space => O(1), since we modify the input array in place

function minCostClimbingStairs(cost: number[]): number {
	for (let i = cost.length - 3; i >= 0; i--) {
		cost[i] = Math.min(cost[i] + cost[i + 1], cost[i] + cost[i + 2]);
	}

	return Math.min(cost[0], cost[1]);
}
