// https://leetcode.com/problems/find-the-longest-semi-repetitive-substring/

// TL;DR:
// Use a Sliding Window approach
// Keep track of the number of consecutive pairs of digits and the maxLength
// Iterate through the string with the right pointer (< n - 1):
//   - If the right digit is the same as the right + 1 digit, increment the pairs variable
//   - While the pairs variable is greater than 1:
//     - If the left digit is the same as the left + 1 digit, decrement the pairs variable
//     - Increment the left pointer
//   - Update the maxLength with max(maxLength, right - left + 2) -> + 2 to take into the next right digit too since we iterate until n - 1
// Return the maxLength

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1), as we are only using a few variables

function longestSemiRepetitiveSubstring(s: string): number {
    let pairs = 0;
    let left = 0;
    let maxLength = 1;
    for (let right = 0; right < s.length - 1; right++) {
        if (s[right] === s[right + 1]) {
            pairs++;
        }

        while (pairs > 1) {
            if (s[left] === s[left + 1]) {
                pairs--;
            }
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 2);
    }

    return maxLength;
};