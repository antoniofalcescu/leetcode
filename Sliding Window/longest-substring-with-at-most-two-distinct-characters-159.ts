// https://neetcode.io/problems/longest-substring-with-at-most-two-distinct-characters

// Hint:
// - Sliding Window approach with a frequency map and unique characters variables to handle current window state (increment with right pointer, decrement with left pointer)

// TL;DR:
// Use a frequency map to store the frequency of each character in the current window
// Use 2 pointers (left and right) to iterate through the string
// Iterate through the string with the right pointer and:
//   - If the current character is not in the frequency map, increment the number of unique characters
//   - Increment/Initialize the frequency of the current character in the frequency map
//   - While the number of unique characters is greater than 2, decrement the frequency of the leftmost character and increment the left pointer
//     - If the frequency of the leftmost character is 0, decrement the number of unique characters
//   - Update the maximum length with max(maxLength, right - left + 1)

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1), as we have a fixed size of 26 for the frequency map

class LongestSubstringWithAtMostTwoDistinctCharacters {
	/**
	 * @param {string} s
	 * @return {number}
	 */
	lengthOfLongestSubstringTwoDistinct(s) {
		const k = 2;
		const freqMap = {};
		let maxLength = 0;
		let left = 0;
		let uniqueChars = 0;
		for (let right = 0; right < s.length; right++) {
			const rightChar = s[right];
			if (!freqMap[rightChar]) {
				uniqueChars++;
			}
			freqMap[rightChar] = (freqMap[rightChar] ?? 0) + 1;
			while (uniqueChars > k) {
				const leftChar = s[left++];
				freqMap[leftChar]--;
				if (freqMap[leftChar] === 0) {
					uniqueChars--;
				}
			}
			const length = right - left + 1;
			maxLength = Math.max(maxLength, length);
		}

		return maxLength;
	}
}
