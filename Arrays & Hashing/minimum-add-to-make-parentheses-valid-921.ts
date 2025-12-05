// https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/

// Hint:
// - No need for stack logic, just count how many open parentheses we have

// TL;DR:
// No need for stack logic, just count how many open parentheses we have
// Iterate through the string:
//   - If we find a open parenthesis, increment the open counter
//   - If we find a close parenthesis:
//     - If we have no open parentheses, increment the answer
//     - Otherwise, decrement the open counter
// Return the answer + the number of open parentheses

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function minAddToMakeValid(s: string): number {
	let open = 0;
	let ans = 0;
	for (const c of s) {
		if (c === "(") {
			open++;
		} else {
			if (open === 0) {
				ans++;
			} else {
				open--;
			}
		}
	}
	return ans + open;
}
