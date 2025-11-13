// https://leetcode.com/problems/maximum-number-of-operations-to-move-ones-to-the-end/

// TL;DR:
// Uses a greedy approach:
//   - For example "1001101":
//       - First one is counted as 1 operation when moved before the next one
//       - Next segment of 2 ones is found and counted for a total of 3 operations when moved before the next and final one
//       - answer = 1 + 3 = 4
// Iterate through the string and:
//   - If the current character is a one, increment the count of ones
//   - If the curent character is a zero, add the count of ones to the ans and increment the pointer until the next one is found
// Return the ans

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function maxOperations(s: string): number {
	let count = 0;
	let ans = 0;
	let i = 0;

	while (i < s.length) {
		if (s[i] === "1") {
			count++;
		} else {
			ans += count;
			while (i + 1 < s.length && s[i + 1] === "0") {
				i++;
			}
		}
		i++;
	}

	return ans;
}
