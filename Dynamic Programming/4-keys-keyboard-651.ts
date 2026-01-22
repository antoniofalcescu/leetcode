// https://neetcode.io/problems/4-keys-keyboard/question

// TL;DR:
// Instead of simulating all 4 choices each time and resulting in a 4D DP array, we must think on how to reduce the states to 1D DP:
//   - treat the dp[i] value as the maximum number of A's we can get after i keystrokes
//   - the only valid choices are:
//     - press A (1 A)
//     - press Ctrl-A, Ctrl-C, Ctrl-V which is always more optimal than pressing A multiple times (if we have enough keystrokes left)
// Initialize the DP array
// Create a helper bkt top-down function based on the number of keystrokes left:
//   - Base case: If the number of keystrokes left is 0, return 0
//   - Recursive case:
//     - The result can be initialize with 1 + bkt(i - 1) -> if we only press A for each keystroke
//     - Iterate from 1 to i - 2 to calculate the possible result if we do the series of Ctrl-A, Ctrl-C, Ctrl-V operations:
//       - Build the first j A's (jAs = bkt(j))
//       - Stop appending A's and calculate the current J result (jAs + jAs * (i - j - 2)) => jAs = first j A's + the number of times we can paste the current jAs (i - j - 2):
//          - i = number of total keystrokes left
//          - j = number of keystrokes used to build the first j A's
//          - - 2 = CTRL-A + CTRL-C
//     - Update the DP array with the result and return it

// Complexities:
// Time => O(n^2), where n is the target number
// Space => O(n), where n is the target number

class FourKeysKeyboardSolution {
	/**
	 * @param {number} n
	 * @return {number}
	 */
	maxA(n) {
		const dp = Array.from({ length: n + 1 }, () => undefined);

		function bkt(i) {
			if (i === 0) {
				return 0;
			}
			if (dp[i] !== undefined) {
				return dp[i];
			}

			let result = 1 + bkt(i - 1);
			for (let j = 1; j < i - 2; j++) {
				const jAs = bkt(j);
				result = Math.max(result, jAs + jAs * (i - j - 2));
			}

			dp[i] = result;
			return result;
		}

		return bkt(n);
	}
}
