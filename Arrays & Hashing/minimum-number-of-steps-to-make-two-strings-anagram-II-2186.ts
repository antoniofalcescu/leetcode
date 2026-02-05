// https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram-II/

// TL;DR:
// Build one hash map for each string and count the frequency of each letter
// Keep track of the common number of letter appearances between the two strings
// Iterate through one of the hash maps and for each letter:
//   - If the letter exists in the other hash map, add min(freq(letter in s), freq(letter in t)) to the common counter
// Return s.length + t.length - common * 2

// Complexities:
// Time => O(s + t), where s is the length of s and t is the length of t
// Space => O(1), as we have 26 characters in the alphabet

function minSteps(s: string, t: string): number {
    const sFreq: Record<string, number> = {};
    for (const c of s) {
        sFreq[c] = (sFreq[c] ?? 0) + 1;
    }

    const tFreq: Record<string, number> = {};
    for (const c of t) {
        tFreq[c] = (tFreq[c] ?? 0) + 1;
    }

    let common = 0;
    for (const letter of Object.keys(sFreq)) {
        if (tFreq[letter]) {
            common += Math.min(sFreq[letter], tFreq[letter]);
        }
    }

    return s.length + t.length - common * 2;
};