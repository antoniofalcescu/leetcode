// https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/

// Hint:
// - Variant of Two Sum, only trick to take into account 0 remainder case

// TL;DR:
// Use a hash map to store the frequency of each remainder (0 to 59)
// Iterate through the time array and:
//   - Calculate the needed remainder to make the current duration divisible by 60 (take into account 0 remainder case)
//   - Add the number of times the needed remainder appears to the answer
//   - Increment the frequency of the current remainder
// Return the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function numPairsDivisibleBy60(time: number[]): number {
	const map = {};
	let ans = 0;
	for (const t of time) {
		const needed = (60 - (t % 60)) % 60;
		ans += map[needed] ?? 0;

		map[t % 60] = (map[t % 60] ?? 0) + 1;
	}

	return ans;
}
