// https://leetcode.com/problems/maximum-sum-of-three-numbers-divisible-by-three/

// TL;DR:
// There are 4 ways to get a sum of 3 numbers divisible by 3:
//   - All numbers with remainder 0
//   - All numbers with remainder 1
//   - All numbers with remainder 2
//   - A mix of all numbers with remainders 0, 1, 2
// Sort the array in descending order
// Use a 3x3 matrix to store the maximum numbers for each remainder (0, 1, 2) with defaults to -Infinity and each pointer (0, 1, 2)
// Iterate through the sorted array and for each number:
//   - Calculate the remainder for the current number
//   - If the pointer is less than 3, update the maximum number for the remainder and increment the pointer
// Calculate the sum for all cases and take the maximum

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(1)

function maximumSum(nums: number[]): number {
	const maxes = Array.from({ length: 3 }, () =>
		Array.from({ length: 3 }, () => -Infinity)
	);
	const pointers = Array.from({ length: 3 }, () => 0);

	nums.sort((a, b) => b - a);
	for (const num of nums) {
		const remainder = num % 3;
		const pointer = pointers[remainder];
		if (pointer < 3) {
			maxes[remainder][pointer] = num;
			pointers[remainder]++;
		}
	}

	const [zeroes, ones, twos] = maxes;
	const zeroesSum = zeroes.reduce((acc, num) => acc + num, 0);
	const onesSum = ones.reduce((acc, num) => acc + num, 0);
	const twosSum = twos.reduce((acc, num) => acc + num, 0);
	const mixedSum = zeroes[0] + ones[0] + twos[0];

	return Math.max(0, zeroesSum, onesSum, twosSum, mixedSum);
}
