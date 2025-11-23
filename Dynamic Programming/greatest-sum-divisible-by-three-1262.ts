// https://leetcode.com/problems/greatest-sum-divisible-by-three/

// TL;DR:
// Use a hash map to store the minimum value for each modulo 3
// Iterate through the input array and:
//   - Calculate the current modulo 3
//   - Calculate the current modulo value and the current invert modulo value (3 - currMod)
//   - Update the hash map with the new values:
//     - The current invert modulo value is the min(currInvertModValue, x + currModValue)
//     - The current modulo value is the min(currModValue, x)
// Return the sum minus the minimum value for the modulo

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function maxSumDivThree(nums: number[]): number {
	const sum = nums.reduce((x, acc) => acc + x, 0);
	const mod = sum % 3;
	if (mod === 0) {
		return sum;
	}

	const map: Record<number, number> = {};
	for (const x of nums) {
		const currMod = x % 3;
		const currModValue = map[currMod] ?? sum;
		const currInvertModValue = map[3 - currMod] ?? sum;

		map[3 - currMod] = Math.min(
			currInvertModValue,
			Math.min(x + currModValue, sum)
		);
		map[currMod] = Math.min(currModValue, x);
	}

	return sum - (map[mod] ?? 0);
}
