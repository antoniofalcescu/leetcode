// https://leetcode.com/problems/number-of-matching-subsequences/

// TL;DR:
// Build a hash map of list of indices per letter in the input string
// Iterate through the input words and for each word:
//   - Use a variable to store the previous minimum index (-1 initially) and a isMatch flag (true initially)
//   - Iterate through the word and for each letter:
//     - If the letter is not in the hash map, set the isMatch flag to false and break the loop
//     - Use a binary search to find the minimum index in the list of indices that is greater than the previous minimum index
//     - If the minimum index is -1, set the isMatch flag to false and break the loop
//     - Update the previous minimum index to the found minimum index
//   - If the isMatch flag is true, increment the matches counter
// Return the matches counter

// Complexities:
// Time => O(n * m * log(s)), where s is the length of the input string and n is the length of the input words and m is the length of each word
// Space => O(s), where s is the length of the input string

function findInArray(arr: number[], minIdx: number): number {
    let left = 0;
    let right = arr.length - 1;
    let ansIdx = -1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] > minIdx) {
            ansIdx = arr[mid];
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return ansIdx;
}

function numMatchingSubseq(s: string, words: string[]): number {
    const posMap: Record<string, number[]> = {};
    for (let i = 0; i < s.length; i++) {
        if (!posMap[s[i]]) {
            posMap[s[i]] = [];
        }
        posMap[s[i]].push(i);
    }

    let matches = 0;
    for (const word of words) {
        let isMatch = true;
        let prevMinIdx = -1;
        for (const letter of word) {
            if (!posMap[letter]) {
                isMatch = false;
                break;
            }

            prevMinIdx = findInArray(posMap[letter], prevMinIdx);
            if (prevMinIdx === -1) {
                isMatch = false;
                break;
            } 
        }

        if (isMatch) {
            matches++;
        }
    }

    return matches;
};