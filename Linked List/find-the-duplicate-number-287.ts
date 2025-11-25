// https://leetcode.com/problems/find-the-duplicate-number/

// TL;DR:
// Key is that the array has length n + 1 and the numbers are in the range 1 to n
// If we treat the array as a linked list, we can visualize a cycle inside it (with the nodes as indices and jump with node = nums[node])
// We can use the fast and slow pointer approach to reach a point inside the cycle where they intersect
// After we find the cycle point, we need another slow pointer to start from the beginning and wait for it to intersect with the first slow pointer to find the start of the cycle (this is the duplicate number)
//   - This works mathematically because:
//     - Let's say we have P nodes before the cycle, C nodes inside the cycle and X nodes from the slow/fast intersection cycle point to the start of the cycle
//     - Starting from 2 * slow = fast => 2 * (P + C - X) = P + C + C - X => 2P + 2C - 2X = P + 2C - X => P - X = 0 => P = X
// Return any of the slow pointers

// Complexities:
// Time => O(n), where n is the number of elements in the array
// Space => O(1), in-place solution

function findDuplicate(nums: number[]): number {
	let [slow, fast] = [0, 0];
	while (true) {
		slow = nums[slow];
		fast = nums[nums[fast]];
		if (slow === fast) {
			break;
		}
	}

	let slow2 = 0;
	while (slow !== slow2) {
		slow = nums[slow];
		slow2 = nums[slow2];
	}
	return slow;
}
