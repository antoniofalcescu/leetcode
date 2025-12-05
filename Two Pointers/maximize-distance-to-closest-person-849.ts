// https://leetcode.com/problems/maximize-distance-to-closest-person/

// Hint:
// - Keep track of the start and end positions of the contiguous 0s block

// TL;DR:
// Use a basic while loop with one pointer to iterate through the array
// If we find a 1, just skip it
// When we find a 0, look for the full contigous 0s block:
//   - Save the start position at the first 0 position of the block
//   - Find the end position of the block (pointer - 1)
//   - We have 2 casese:
//     - If the block of zeroes is at the start or at the end of the array, the maximum distance we can choose is the length of the block (first/last zero)
//     - If the block of zeroes is somewhere in the middle, the maximum distance we can choose is the middle of the block (length / 2), make suire to handle both odd/even lengths here

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function maxDistToClosest(seats: number[]): number {
	const n = seats.length;
	let i = 0;
	let maxDistance = 0;

	while (i < n) {
		if (seats[i] === 1) {
			i++;
			continue;
		}

		const start = i;
		while (i < n && seats[i] === 0) {
			i++;
		}

		const end = i - 1;
		const length = end - start + 1;
		if (start === 0 || end === n - 1) {
			maxDistance = Math.max(maxDistance, length);
		} else {
			const distance = Math.ceil(length / 2);
			maxDistance = Math.max(maxDistance, distance);
		}
	}

	return maxDistance;
}
