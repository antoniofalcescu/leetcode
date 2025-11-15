// https://leetcode.com/problems/count-the-number-of-substrings-with-dominant-ones/

// TL;DR:
// Initialize a nextZeroIndexes array to store the index of the next zero for each index in the string (with n - out of bounds index as default)
// Iterate with left pointer and for each index:
//   - Initialize right pointer to the left pointer
//   - Initialize zeroes count according to current character
//   - While the number of zeroes squared is less than or equal to the string length:
//     - Get the next zero index from the nextZeroIndexes array (non-inclusive)
//     - Calculate the window length and number of onex (length - zeroes)
//     - If the number of ones is greater than or equal to the number of zeroes squared, increment the answer by:
//       - the difference between the next zero index and right pointer
//       - the number of ones minus the number of zeroes squared plus one
//     - Update the right pointer to the next zero index
//     - Increment the zeroes count by 1 (since we jumped to the next zero)
//     - If the right pointer is equal to the string length, break the inner loop and the next left loop will reset it

// Complexities:
// Time => O(n * sqrt(n)), where n is the length of the input string
// Space => O(n), where n is the length of the input string

function numberOfSubstrings(s: string): number {
	const n = s.length;
	const nextZeroIndexes = Array.from({ length: n }, () => n);
	for (let i = n - 2; i >= 0; i--) {
		if (s[i + 1] === "0") {
			nextZeroIndexes[i] = i + 1;
		} else {
			nextZeroIndexes[i] = nextZeroIndexes[i + 1];
		}
	}

	let ans = 0;
	for (let left = 0; left < n; left++) {
		let right = left;
		let zeroes = s[left] === "0" ? 1 : 0;

		while (Math.pow(zeroes, 2) <= n) {
			// nextZeroIndex is non-inclusive
			const nextZeroIndex = nextZeroIndexes[right];
			const windowLength = nextZeroIndex - left;
			const ones = windowLength - zeroes;

			if (ones >= Math.pow(zeroes, 2)) {
				ans += Math.min(nextZeroIndex - right, ones - Math.pow(zeroes, 2) + 1);
			}

			right = nextZeroIndex;
			zeroes++;

			if (right === n) {
				break;
			}
		}
	}

	return ans;
}
