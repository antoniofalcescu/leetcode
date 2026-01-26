// https://leetcode.com/problems/h-index-ii/

// TL;DR:
// Can solve with a binary search approach by trying every mid value in range [1, n] and checking if it's a valid h-index
//    - Can skip 0 as we initialize maxHIndex to 0 and it helps with array of length 1 edge case
// Binary search from left to right:
//   - Calculate the mid (hIndex) based on left and right
//   - The number of citations we need to have after this hIndex is n - hIndex, therefore we need to check if the citation[n - hIndex] is of at least hIndex
//   - If it is, we save it in maxHIndex and try to find a higher h-index by incrementing the left pointer
//   - If it is not, we try to find a lower h-index by decrementing the right pointer
// Return the highest valid h-index found

// Complexities:
// Time => O(log n), where n is the length of the input array
// Space => O(1)

function hIndex(citations: number[]): number {
    const n = citations.length;
    let [left, right] = [1, n];
    let maxHIndex = 0;
    while (left <= right) {
        const hIndex = Math.floor((left + right) / 2);
        const minCitationIdx = n - hIndex;
        if (citations[minCitationIdx] >= hIndex) {
            maxHIndex = hIndex;
            left = hIndex + 1;
        } else {
            right = hIndex - 1;
        }
    }

    return maxHIndex;
};