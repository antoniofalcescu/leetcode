// https://leetcode.com/problems/1-bit-and-2-bit-characters/

// TL;DR:
// Use a pointer to iterate through the array and check if the current bit is 1 or 0
// If the current bit is 1, increment the pointer by 2 (since it's a 2-bit character)
// If the current bit is 0, increment the pointer by 1
// Return true if the pointer reached the last index (0) or jumped over

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function isOneBitCharacter(bits: number[]): boolean {
	const n = bits.length;
	let i = 0;
	while (i < n - 1) {
		if (bits[i] === 1) {
			i += 2;
		} else {
			i++;
		}
	}

	return i === n - 1;
}
