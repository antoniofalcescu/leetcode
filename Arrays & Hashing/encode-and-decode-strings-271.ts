// https://leetcode.com/problems/encode-and-decode-strings/

// TL;DR:
// Considering strs can have all UTF-8 characters, we need to encode strings to know about the length of the word
// Encode: For each string, append the length of the string, a '#' and the string itself to the result
// Decode: Iterate through the string with 2 pointers:
//   - The left pointer is at the start of the sequence (length#word)
//   - The right pointer starts from left and iterates until the '#' is found
//   - The substring [left, right] tells us the number which is the length of the word
//   - The word itself will be the substring [right + 1, right + 1 + length]
//   - Add the word to the result array and move the left pointer to the next sequence

// Complexities:
// Time => O(n), where n is the number of characters
// Space => O(n), where n is the number of characters

class EncodeAndDecodeStringsSolution {
	/**
	 * @param {string[]} strs
	 * @returns {string}
	 */
	encode(strs) {
		let res = "";
		for (const str of strs) {
			res += str.length + "#" + str;
		}
		return res;
	}

	/**
	 * @param {string} str
	 * @returns {string[]}
	 */
	decode(str) {
		const res: string[] = [];
		let left = 0;
		while (left < str.length) {
			let right = left;
			while (str[right] !== "#") {
				right++;
			}
			const length = Number(str.slice(left, right));
			const word = str.slice(right + 1, right + 1 + length);
			res.push(word);

			left = right + 1 + length;
		}

		return res;
	}
}
