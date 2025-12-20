// https://leetcode.com/problems/matchsticks-to-square/

// TL;DR:
// The problems basically wants to find if its possible to split the input array into 4 subsets with the same sum
//   - Sort the input array in descending order to try to fit the largest matchstick first (greedy approach to avoid unnecessary backtracking)
//   - Calculate the target side length by dividing the sum of the input array by 4
//   - If the sum is not divisible by 4, return false
//   - Otherwise, use a backtracking approach to try to fit the matchsticks into the sides of the square:
//     - Keep track of the current index and the current value of all 4 sides
//     - Base case: If we reached the end of the input array, return true
//     - Otherwise, iterate through the 4 sides:
//       - If adding the current matchstick to the current side would exceed the target, skip it
//       - If the current side is equal to the previous side, skip it
//       - Otherwise, add the current matchstick to the current side and recursively call the bkt function with the next index and the updated sides
//       - If the recursive call returns true, return true
//       - Otherwise, remove the current matchstick from the current side and continue to the next side
//     - Return false

// Complexities:
// Time => O(4^n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function makesquare(matchsticks: number[]): boolean {
	matchsticks.sort((a, b) => b - a);

	const sum = matchsticks.reduce((acc, num) => acc + num, 0);
	if (sum % 4 !== 0) {
		return false;
	}

	const target = sum / 4;
	function bkt(i: number, sides: number[]): boolean {
		if (i === matchsticks.length) {
			return true;
		}

		for (let j = 0; j < 4; j++) {
			if (sides[j] + matchsticks[i] > target) {
				continue;
			}

			if (j > 0 && sides[j] === sides[j - 1]) {
				continue;
			}

			sides[j] += matchsticks[i];
			if (bkt(i + 1, sides)) {
				return true;
			}
			sides[j] -= matchsticks[i];
		}

		return false;
	}

	return bkt(0, [0, 0, 0, 0]);
}
