// https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/

// TL;DR:
// Use a bitmask to store the state of the vowels in the string:
//   - up to 2^5 bitmask value, each bit is 0 if the vowel at that index is even, 1 if it's odd
// Keep track of a firstSeen map to store the first index appearance of each bitmask:
//   - a subarray (i, j] is valid if bitmask[i] === bitmask[j]
//   - set 0: -1 (to handle valid subarrays starting from 0)
// Iterate through the string and for each character:
//   - If the character is a vowel, XOR the bitmask with 1 << the position of the vowel
//   - If the bitmask is seen before, update the max length with max(maxLength, i - firstSeen[bitmask])
//   - Otherwise, store the bitmask and the index in the first seen map
// Return the max length

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1), because the bitmask is of fixed size (5)

function findTheLongestSubstring(s: string): number {
    const VOWELS = {
        a: 0,
        e: 1,
        i: 2,
        o: 3,
        u: 4,
    };
    let bitmask = 0;
    const firstSeen = { 0: -1 };

    let maxLength = 0;
    for (let i = 0; i < s.length; i++) {
        if (VOWELS[s[i]] !== undefined) {
            bitmask ^= 1 << VOWELS[s[i]];
        }

        if (firstSeen[bitmask] !== undefined) {
            maxLength = Math.max(maxLength, i - firstSeen[bitmask]);
        } else {
            firstSeen[bitmask] = i;
        }
    }

    return maxLength;
};