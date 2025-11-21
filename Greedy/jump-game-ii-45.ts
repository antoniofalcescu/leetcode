// https://leetcode.com/problems/jump-game-ii/

// TL;DR:
// Use a greedy approach
//   - Initialize a variable to store the answer and 2 left, right pointers to track the current window
//   - While the right pointer is less than the last index:
//     - Find the farthest index we can reach from the current window (try all indices in the current window and their max reach and keep the max found)
//     - Update the left and right pointers to the next window
//     - Increment the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function jump(nums: number[]): number {
	let ans = 0;
	let [l, r] = [0, 0];
	while (r < nums.length - 1) {
		let farthest = 0;
		for (let i = l; i <= r; i++) {
			farthest = Math.max(farthest, i + nums[i]);
		}
		[l, r] = [r + 1, farthest];
		ans++;
	}

	return ans;
}
