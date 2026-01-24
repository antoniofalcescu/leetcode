// https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/

// TL;DR:
// Use a frequency map to store the frequency of each character in the string
// Build an array based on the frequency map and sort it DESC
// Iterate through the array and for each frequency:
//   - If current freq <= next freq:
//     - Calculate the diff = freq[i + 1] - freq[i]
//     - If the current freq is not 0, increment the diff by 1 (as we allow duplicate 0, but not other values > 0)
//     - Update the next freq by substracting the diff from it and the answer by incrementing it by the diff
// Return the deletions

// Complexities:
// Time => O(n * log(n)), where n is the length of the input string
// Space => O(n), where n is the number of unique characters in the input string

function minDeletions(s: string): number {
    const sFreq: Record<string, number> = {};
    for (const c of s) {
        sFreq[c] = (sFreq[c] ?? 0) + 1;
    }

    let deletions = 0;
    const freqs = Object.values(sFreq).sort((a, b) => b - a);
    for (let i = 0; i < freqs.length - 1; i++) {
        if (freqs[i] <= freqs[i + 1]) {
            let diff = freqs[i + 1] - freqs[i];
            if (freqs[i] > 0) {
                diff++;
            }
            
            freqs[i + 1] -= diff;
            deletions += diff;
        }
    }

    return deletions;
};