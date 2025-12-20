// https://leetcode.com/problems/partition-to-k-equal-sum-subsets/

// TL;DR:
// Generalization of LC. 473 Matchsticks to Square
// The problems basically wants to find if its possible to split the input array into k subsets with the same sum
//   - Sort the input array in descending order to try to fit the largest number first (greedy approach to avoid unnecessary backtracking)
//   - Calculate the target sum by dividing the sum of the input array by k
//   - If the sum is not divisible by k, return false
//   - Otherwise, use a backtracking approach to try to fit the numbers into the subsets:
//     - Keep track of the current index and the current value of all k subsets
//     - Base case: If we reached the end of the input array, return true
//     - Otherwise, iterate through the k subsets:
//       - If adding the current number to the current subset would exceed the target, skip it
//       - If the current subset is equal to the previous subset, skip it
//       - Otherwise, add the current number to the current subset and recursively call the bkt function with the next index and the updated subsets
//       - If the recursive call returns true, return true
//       - Otherwise, remove the current number from the current subset and continue to the next subset
//     - Return false

// Complexities:
// Time => O(k^n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function canPartitionKSubsets(nums: number[], k: number): boolean {
	nums.sort((a, b) => b - a);

	const sum = nums.reduce((acc, num) => acc + num, 0);
	if (sum % k !== 0) {
		return false;
	}

	const target = sum / k;
	function bkt(i: number, subsets: number[]): boolean {
		if (i === nums.length) {
			return true;
		}

		for (let j = 0; j < k; j++) {
			if (subsets[j] + nums[i] > target) {
				continue;
			}

			if (j > 0 && subsets[j] === subsets[j - 1]) {
				continue;
			}

			subsets[j] += nums[i];
			if (bkt(i + 1, subsets)) {
				return true;
			}
			subsets[j] -= nums[i];
		}

		return false;
	}

	const subsets = Array.from({ length: k }, () => 0);
	return bkt(0, subsets);
}
