// https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/

// TL;DR:
// Use a greedy approach to count the number of unmatched brackets
// Keep track of the number of open and closed brackets and the max unmatching number of parentheses
// Iterate through the string and for each character:
//   - If it's an opening bracket, increment the open counter
//   - If it's a closing bracket, increment the closed counter
//   - If the closed counter is greater than the open counter, unmatching = max(unmatching, closed - open)
// The number of swaps is ceil(unmatching / 2)

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function minSwaps(s: string): number {
    let [open, closed] = [0, 0];
    let unmatching = 0;
    for (const c of s) {
        if (c === '[') {
            open++;
        } else {
            closed++;
        }

        if (closed > open) {
            unmatching = Math.max(unmatching, closed - open);
        }
    }

    return Math.ceil(unmatching / 2);
};