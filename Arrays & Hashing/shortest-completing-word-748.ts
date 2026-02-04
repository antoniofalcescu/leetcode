// https://leetcode.com/problems/shortest-completing-word/

// TL;DR:
// Build a hash map of the frequency of each letter in the license plate
// Iterate through the words and for each word:
//   - Build a hash map of the frequency of each letter in the word
//   - If the current word map doesn't have all letters of the plate map, skip it
//   - If it does, check if the counts in the word map >= counts in the plate map for all letters and update the shortest word with the current word
// Return the shortest word

// Complexities:
// Time => O(l + n * m), where l is the length of the license plate and n is the length of the input words and m is the length of each word
// Space => O(1), as we have 26 characters in the alphabet

function isLetter(c: string): boolean {
    return c >= 'a' && c <= 'z';
}

function shortestCompletingWord(licensePlate: string, words: string[]): string {
    const plateMap: Record<string, number> = {};
    for (const c of licensePlate) {
        const lowerC = c.toLowerCase();
        if (!isLetter(lowerC)) {
            continue;
        }

        plateMap[lowerC] = (plateMap[lowerC] ?? 0) + 1;
    }

    let [shortestWord, shortestLength] = ["", Infinity];
    for (const word of words) {
        const wordMap: Record<string, number> = {};
        for (const letter of word) {
            if (plateMap[letter]) {
                wordMap[letter] = (wordMap[letter] ?? 0) + 1;
            }
        }
        
        if (Object.keys(wordMap).length !== Object.keys(plateMap).length) {
            continue;
        }

        let isMatching = true;
        for (const [letter, count] of Object.entries(wordMap)) {
            if (count < plateMap[letter]) {
                isMatching = false;
                break;
            }
        }

        if (isMatching && shortestLength > word.length) {
            shortestLength = word.length;
            shortestWord = word;
        }
    }

    return shortestWord;
};