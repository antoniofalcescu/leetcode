// https://leetcode.com/problems/reverse-bits/

// TL;DR:
// Keep track of the result in a separate variable initialized to 0
// Iterate through all 32 bits:
//   - Shift the result to the left by 1 bit to make room for the next bit
//   - Take the LSB of the number and add it to the result (use OR to add it)
//   - Shift the number to the right by 1 bit to remove the added LSB
// Return the result

// Complexities:
// Time => O(32) = O(1)
// Space => O(1)

function reverseBits(n: number): number {
	let ans = 0;
	for (let i = 0; i < 32; i++) {
		ans <<= 1;
		ans |= n & 1;
		n >>>= 1;
	}

	return ans;
}
