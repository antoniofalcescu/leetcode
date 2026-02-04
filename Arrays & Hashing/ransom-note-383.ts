// https://leetcode.com/problems/ransom-note/

// TL;DR:
// Build a hash map of the frequency of each letter in the magazine
// Iterate through the ransom note and for each letter:
//   - If the letter doesn't exist in the magazine hash map or its frequency is 0, return false
//   - Otherwise, decrement the frequency of the letter in the magazine hash map
// Return true

// Complexities:
// Time => O(m + n), where m is the length of the magazine and n is the length of the ransom note
// Space => O(1), as we have 26 characters in the alphabet

function canConstruct(ransomNote: string, magazine: string): boolean {
    const magazineFreq: Record<string, number> = {};
    for (const c of magazine) {
        magazineFreq[c] = (magazineFreq[c] ?? 0) + 1;
    }

    for (const c of ransomNote) {
        if (!magazineFreq[c]) {
            return false;
        }

        magazineFreq[c]--;
    }

    return true;
};