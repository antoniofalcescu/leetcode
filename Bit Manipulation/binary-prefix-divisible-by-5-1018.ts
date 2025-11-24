// https://leetcode.com/problems/binary-prefix-divisible-by-5/

// TL;DR:
// Use a variable to store the current number
// Iterate through the nums array and:
//   - Update the current number by multiplying it by 2 and adding the current number (modulo 5 to not overflow)
//   - Push to the array true/false based on the number being divisible by 5

function prefixesDivBy5(nums: number[]): boolean[] {
	let curr = 0;
	const ans: boolean[] = [];
	for (const x of nums) {
		curr = (curr * 2 + x) % 5;
		ans.push(curr === 0);
	}
	return ans;
}
