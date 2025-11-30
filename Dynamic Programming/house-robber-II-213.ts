// https://leetcode.com/problems/house-robber-ii/

// Hint:
// - DP bottom-up approach, similar to House Robber I, but with calculating both first/last house scenarios

// TL;DR:
// Use a DP bottom-up approach (Similar to House Robber I)
//   - Split the problem into two subproblems:
//     - Robbing the houses without the first house
//     - Robbing the houses without the last house
//   - Return the maximum House Robber I result of the two subproblems

// Complexities:
// Time => O(n), where n is the length of the nums array
// Space => O(1)

function rob(nums: number[]): number {
	const housesWithoutFirst = nums.slice(1);
	const housesWithoutLast = nums.slice(0, nums.length - 1);

	return Math.max(
		nums[0],
		robBasic(housesWithoutFirst),
		robBasic(housesWithoutLast)
	);
}

function robBasic(nums: number[]): number {
	let [rob1, rob2] = [0, 0];
	for (const num of nums) {
		const newRob = Math.max(rob1 + num, rob2);
		rob1 = rob2;
		rob2 = newRob;
	}
	return rob2;
}
