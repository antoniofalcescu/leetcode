// https://leetcode.com/problems/n-th-tribonacci-number/

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize three variables to store the current 3 tribonacci numbers
//   - If n is 0, return t0 (edge case)
//   - Iterate through the remaining tribonacci sequence and update the variables from i = 3 to n:
//     - The current tribonacci number is the sum of the previous three tribonacci numbers
//     - Shift the variables to the left: t0 = t1; t1 = t2; t2 = t;
//   - Return the current tribonacci number stored in t2

// Complexities:
// Time => O(n), where n is the number of the tribonacci number
// Space => O(1)

function tribonacci(n: number): number {
	let [t0, t1, t2] = [0, 1, 1];
	if (n === 0) {
		return t0;
	}
	for (let i = 3; i <= n; i++) {
		const t = t0 + t1 + t2;
		t0 = t1;
		t1 = t2;
		t2 = t;
	}

	return t2;
}
