// https://leetcode.com/problems/last-stone-weight-ii/

// TL;DR:
// Trick is to to find that we need to find a maximal subset whose sum is as close as possible to half of the total sum
// Use a DP bottom-up approach
//   - Initialize a DP array with the length of the target + 1, values = 0
//   - Iterate through the stones and for each stone:
//     - Iterate through the DP array backwards from target to current stone and for each sum:
//       - Update the sum DP value with the max(current sum DP value, sum - stone DP value + stone)
//   - Return the total - target * 2 (what remains after we collide the 2 maximal subsets we find)

// Complexities:
// Time => O(n * m), where n is the length of the stones array and m is the target
// Space => O(m), where m is the target

function lastStoneWeightII(stones: number[]): number {
	const total = stones.reduce((acc, num) => acc + num, 0);
	const target = Math.floor(total / 2);

	const dp = Array.from({ length: target + 1 }, () => 0);
	for (const stone of stones) {
		for (let sum = target; sum >= stone; sum--) {
			dp[sum] = Math.max(dp[sum], dp[sum - stone] + stone);
		}
	}

	return total - dp[target] * 2;
}
