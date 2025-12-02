// https://leetcode.com/problems/partition-equal-subset-sum/

// Hint:
// - DP bottom-up approach with a Set DP, find the subset that sums up to half of the sum of the input array

// TL;DR:
// Use a DP bottom-up approach
//   - If the total sum is odd, return false, otherwise find the half sum which will be our target
//   - Initialize a DP set with 0
//   - Iterate through the input array:
//     - Create a new temporary copy set based on the existing DP set
//     - Iterate through the current DP set and add the sum of each number in the set with the current number to the temporary set
//     - Update the DP set with the temporary set
//     - If the target sum is in the DP set, return true
//   - Return false

// Complexities:
// Time => O(n * m), where n is the length of the input array and m is the sum of the input array
// Space => O(m), where m is the sum of the input array

function canPartition(nums: number[]): boolean {
	const sum = nums.reduce((acc, num) => acc + num, 0);
	if (sum % 2 === 1) {
		return false;
	}

	let target = sum / 2;
	let dp = new Set<number>([0]);
	for (const num of nums) {
		const nextDp = new Set<number>(dp);
		for (const dpNum of dp) {
			nextDp.add(dpNum + num);
		}
		dp = nextDp;

		if (dp.has(target)) {
			return true;
		}
	}

	return false;
}
