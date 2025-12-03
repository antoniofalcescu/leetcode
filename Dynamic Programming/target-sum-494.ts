// https://leetcode.com/problems/target-sum/

// Hint:
// - DP bottom-up approach, where the naive solution is to store O(n * m) space (DP array with a hash map for each index)
// - Draw a 2D array based on an example where the rows are the numbers + 1 and the columns are the sums (0 in the middle 0th row with value 1)
//     - Calculate each bottom row by kind of Pascal's Triangle logic until we reach last row and sum=target

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize a DP hash map with the sum-count pairs (0: 1 first)
//   - Iterate through the input array and for each number:
//     - Create a new temporary DP hash map to store the new sum-count pairs
//     - Iterate through the existing DP hash map:
//       - For both +/- scenarios, add to the temporary DP hash map with the count of the current sum-count pair
//   - Overwrite the DP hash map with the temporary DP hash map
//   - Return the count of the target sum in the DP hash map or 0 if it doesn't exist

function findTargetSumWays(nums: number[], target: number): number {
	let dp: Record<number, number> = { 0: 1 };

	for (let i = 0; i < nums.length; i++) {
		const tempDp = {};
		for (const [sumKey, count] of Object.entries(dp)) {
			const sum = Number(sumKey);
			tempDp[sum + nums[i]] = (tempDp[sum + nums[i]] ?? 0) + count;
			tempDp[sum - nums[i]] = (tempDp[sum - nums[i]] ?? 0) + count;
		}
		dp = tempDp;
	}

	return dp[target] ?? 0;
}
