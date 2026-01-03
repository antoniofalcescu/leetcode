// https://leetcode.com/problems/find-the-winner-of-an-array-game/

// TL;DR:
// Two cases:
// 1. k >= arr.length => return the maximum number in the array
// 2. k < arr.length => simulate game until we have an element with k consecutive wins
//   - Use a champion variable to store the current champion (arr[0]) and a wins variable to store the number of wins
//   - Iterate through the array and update the champion and wins variables accordingly
//   - If the wins variable is equal to k, break the loop
//   - Return the champion

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function getWinner(arr: number[], k: number): number {
    if (k >= arr.length) {
        return Math.max(...arr);
    }

    let champion = arr[0];
    let wins = 0;
    for (let i = 1; i < arr.length; i++) {
        if (champion > arr[i]) {
            wins++;
        } else {
            champion = arr[i];
            wins = 1;
        }

        if (wins === k) {
            break;
        }
    }

    return champion;
};