// https://leetcode.com/problems/split-array-into-consecutive-subsequences/

// Hint:
// - Greedy approach, try to always append to an existing subsequence if possible, otherwise create a new one
// - Trick is to keep the number of subsequences that accept a number so that you can easily know if we can append to an existing subsequence or not

// TL;DR:
// Use a freq map to store the frequency of each number in the input array
// Use another map to store what numbers can be joined to an existing subsequence (number-subsequences that accept this number counter pairs)
// Iterate through the input array and:
//   - If the current number's freq is 0, skip it
//   - If the current number can be joined to an existing subsequence:
//      - Decremet the freq and the subsequences counter for this number
//      - Increment the subsequences counter for the next number
//   - Otherwise, we must create a new subsequence with this number and the next 2:
//      - Check if the next 2 numbers are in the freq map, if not return false
//      - Decrement the freq of all 3 numbers and increment the subsequences counter for the next number
// Return true

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(m), where m is the number of unique numbers in the input array

function isPossible(nums: number[]): boolean {
	const freqMap: Record<number, number> = {};
	for (const num of nums) {
		freqMap[num] = (freqMap[num] ?? 0) + 1;
	}

	const joinMap: Record<number, number> = {};
	for (const num of nums) {
		if (!freqMap[num]) {
			continue;
		}

		if (joinMap[num]) {
			freqMap[num]--;
			joinMap[num]--;

			const nextToJoin = num + 1;
			joinMap[nextToJoin] = (joinMap[nextToJoin] ?? 0) + 1;
		} else {
			for (let i = 0; i < 3; i++) {
				const value = num + i;
				if (!freqMap[value]) {
					return false;
				}
				freqMap[value]--;
			}

			const nextToJoin = num + 3;
			joinMap[nextToJoin] = (joinMap[nextToJoin] ?? 0) + 1;
		}
	}

	return true;
}
