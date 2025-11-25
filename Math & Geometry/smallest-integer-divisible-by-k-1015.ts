// https://leetcode.com/problems/smallest-integer-divisible-by-k/

// TL;DR:
// Use a set to store the unique mods of the current number
// Loop until the current number mod k is 0:
//   - Increment the answer, get the current mod and recycle it for the next run by multiplying it by 10 and adding 1
//   - If our current mod is in the set, we are in an endless cycle and must return -1, otherwise add it for future runs
// Return the answer

// Complexities:
// Time => O(k), where k is the input number
// Space => O(k), where k is the input number

function smallestRepunitDivByK(k: number): number {
	const mods = new Set<number>();
	let curr = 1;
	let ans = 1;
	while (curr % k !== 0) {
		ans++;
		const currMod = curr % k;
		curr = currMod * 10 + 1;
		if (mods.has(currMod)) {
			return -1;
		}
		mods.add(currMod);
	}
	return ans;
}
