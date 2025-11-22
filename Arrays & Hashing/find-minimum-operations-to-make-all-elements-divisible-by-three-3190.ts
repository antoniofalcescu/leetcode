// https://leetcode.com/problems/find-minimum-operations-to-make-all-elements-divisible-by-three/

// TL;DR:
// For each number calculate its modulo 3
// Add the minimum of the difference and 3 - difference to the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function minimumOperations(nums: number[]): number {
	let ans = 0;
	for (const num of nums) {
		const diff = num % 3;
		ans += Math.min(diff, 3 - diff);
	}
	return ans;
}
