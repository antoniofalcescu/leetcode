// https://leetcode.com/problems/greatest-sum-divisible-by-three/

// TL;DR:
// Use an array to store the minimum value for each modulo 3
// Iterate through the input array and:
//   - Calculate the current modulo 3 and the inverted modulo 3 (3 - currMod)
//   - Get the current values for the 2 modulos
//   - Update the array values with the new values:
//     - The current modulo value is the min(currModValue, num)
//     - The current inverted modulo value is the min(currInvertedModValue, currModValue + num)
// Return the sum minus the minimum value for the modulo

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function maxSumDivThree(nums: number[]): number {
	const sum = nums.reduce((acc, num) => acc + num, 0);
	if (sum % 3 === 0) {
		return sum;
	}

	const remainderToMin = [0, sum, sum];
	for (const num of nums) {
		const remainder = num % 3;
		const currRemainderMin = remainderToMin[remainder];

		const invertedRemainder = 3 - remainder;
		const currInvertedRemainderMin = remainderToMin[invertedRemainder];

		remainderToMin[remainder] = Math.min(currRemainderMin, num);
		remainderToMin[invertedRemainder] = Math.min(
			currInvertedRemainderMin,
			currRemainderMin + num
		);
	}
	return sum - remainderToMin[sum % 3];
}
