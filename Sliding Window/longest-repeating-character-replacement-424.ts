// https://leetcode.com/problems/longest-repeating-character-replacement/

// TL;DR:
// Use 2 pointers (left and right) to iterate through the string and use a frequency array to store the frequency of each character in the current window
// For each right pointer char, increment the frequency of the char in the frequency array and update the max frequency with max(maxFreq, freq[rightIndex])
//  - we only need to update it here and not when decreasing left too because it makes the check stricter temporarily and doesn't break the logic
//  - if there is another higher freq character in the following windows, it will still overwrite this value
// While the window size - max frequency is greater than k, decrement the frequency of the leftmost character and increment the left pointer
// Update the max length with max(maxLength, right - left + 1)

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1), as we have a fixed size of 26 for the frequency array

function characterReplacement(s: string, k: number): number {
	const freq = Array.from({ length: 26 }, () => 0);
	let left = 0;
	let maxLength = 0;
	let maxFreq = 0;

	for (let right = 0; right < s.length; right++) {
		const rightIndex = s[right].charCodeAt(0) - "A".charCodeAt(0);
		freq[rightIndex]++;
		maxFreq = Math.max(maxFreq, freq[rightIndex]);

		while (right - left + 1 - maxFreq > k) {
			const leftIndex = s[left].charCodeAt(0) - "A".charCodeAt(0);
			freq[leftIndex]--;

			left++;
		}

		maxLength = Math.max(maxLength, right - left + 1);
	}

	return maxLength;
}
