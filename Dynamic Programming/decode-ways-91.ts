// https://leetcode.com/problems/decode-ways/

// Hint:
// - DP bottom-up approach, draw Decision Tree to understand when to consider two-digit numbers, go with DP array and then optimize to O(1) space

// TL;DR:
// Use a DP bottom-up approach
//   - Initialize three variables to store the current ith value, the ith + 1 and the ith + 2 values (values = number of ways to decode the string s[i:])
//   - Iterate through the string right to left and update the variables:
//     - If the current character is a '0', we can't decode it
//     - Otherwise:
//       - The current DP value is initialized with the ith + 1 value (same decondings as the one next to it)
//       - If the s[i + 1, i + 2] is a valid two-digit number, we can add the ith + 2 value to the current DP value
//     - Shift the DP values to the left: dp2 = dp1; dp1 = currDp; currDp = 0; to recalculate the next iteration's values
//   - Return the dp1 value

// Complexities:
// Time => O(n), where n is the length of the string
// Space => O(1)

function numDecodings(s: string): number {
	let currDp = 0;
	let [dp1, dp2] = [1, 0];

	for (let i = s.length - 1; i >= 0; i--) {
		if (s[i] === "0") {
			currDp = 0;
		} else {
			currDp = dp1;
			if (
				i + 1 < s.length &&
				(s[i] === "1" || (s[i] === "2" && s[i + 1] < "7"))
			) {
				currDp += dp2;
			}
		}

		dp2 = dp1;
		dp1 = currDp;
		currDp = 0;
	}
	return dp1;
}
