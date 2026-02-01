// https://leetcode.com/problems/shuffle-an-array/

// TL;DR:
// Store the original array and the shuffled array
// For reset, simply copy the original array to the shuffled array
// For shuffle, Uuse Fisher-Yates shuffle algorithm to shuffle the array in place with equal probability for each element
//   - For each element, generate a random index between the current index and the end of the array
//   - Swap the element with the element at the random index

// Complexities:
// Reset:
//   - Time => O(n), where n is the length of the input array
//   - Space => O(1)
// Shuffle:
//   - Time => O(n), where n is the length of the input array
//   - Space => O(1)

class Solution {
    private readonly original: number[];
    private arr: number[];

    constructor(nums: number[]) {
        this.original = [...nums];
        this.arr = [...nums];    
    }

    reset(): number[] {
        this.arr = [...this.original];
        return this.arr;
    }

    shuffle(): number[] {
        const n = this.arr.length;
        for (let i = 0; i < n; i++) {
            const swapIdx = Math.floor((Math.random() * (n - i))) + i;
            [this.arr[i], this.arr[swapIdx]] = [this.arr[swapIdx], this.arr[i]];
        }

        return this.arr;
    }
}