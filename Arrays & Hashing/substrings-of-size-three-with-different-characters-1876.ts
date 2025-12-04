// https://leetcode.com/problems/substrings-of-size-three-with-different-characters/

// Hint:
// - Don't overthink it

// TL;DR:
// Iterate through the string and for each 3 consecutive characters:
//   - If all 3 characters are different, increment the answer
// Return the answer

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function countGoodSubstrings(s: string): number {
	let ans = 0;
	for (let i = 0; i < s.length - 2; i++) {
		const [first, second, third] = [s[i], s[i + 1], s[i + 2]];
		if (first !== second && first !== third && second !== third) {
			ans++;
		}
	}
	return ans;
}
