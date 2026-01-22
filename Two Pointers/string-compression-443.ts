// https://leetcode.com/problems/string-compression/

// TL;DR:
// Two pointers approach:
//   - left = the start of the current repeating characters
//   - right = the end of the current repeating characters
//   - i = the character position we override with the current char/length digit and the answer at the end
// Loop with right pointer until the end of the array:
//   - While current right char = current left char, increment right pointer
//   - Override current i position with the current left char and increment i
//   - If length > 1, convert length to string and override i with each digit and increment i
//   - Update left pointer to right pointer to calcualte the next sequence
// Return the i pointer which is the answer

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function compress(chars: string[]): number {
	let [left, right, i] = [0, 0, 0];
	while (right < chars.length) {
		while (right < chars.length && chars[right] === chars[left]) {
			right++;
		}

		chars[i++] = chars[left];
		const length = right - left;
		if (length > 1) {
			for (const digit of length.toString()) {
				chars[i++] = digit;
			}
		}

		left = right;
	}

	return i;
}
