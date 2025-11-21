// https://leetcode.com/problems/merge-triplets-to-form-target-triplet/

// TL;DR:
// Use a greedy approach
//   - Iterate through the triplets and check if the current triplet can be used to form the target triplet:
//        - A triplet can be used in one of 3 ways:
//          - The first element of the triplet is equal to the first element of the target triplet
//          - The second element of the triplet is equal to the second element of the target triplet
//          - The third element of the triplet is equal to the third element of the target triplet
//          - For each element, also check that it doesn't affect the other 2 elements (they have to be <= target elements)
//   - Return true if all three triplets are defined, otherwise false

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function mergeTriplets(triplets: number[][], target: number[]): boolean {
	let triplet1;
	let triplet2;
	let triplet3;
	for (const triplet of triplets) {
		if (
			triplet[0] === target[0] &&
			triplet[1] <= target[1] &&
			triplet[2] <= target[2]
		) {
			triplet1 = triplet;
		}
		if (
			triplet[1] === target[1] &&
			triplet[0] <= target[0] &&
			triplet[2] <= target[2]
		) {
			triplet2 = triplet;
		}
		if (
			triplet[2] === target[2] &&
			triplet[0] <= target[0] &&
			triplet[1] <= target[1]
		) {
			triplet3 = triplet;
		}
	}

	return Boolean(triplet1 && triplet2 && triplet3);
}
