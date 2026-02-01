// https://leetcode.com/problems/snapshot-array/

// TL;DR:
// Trick is to store an array of traces for each index, where each trace is an array of [value, snapCounter] pairs
// Constructor:
//   - Initialize an array of empty traces for each index
//   - Initialize the snapCounter to 0
// Set: 
//   - Push the [value, snapCounter] pair to the trace array of the index
// Snap:
//   - Increment the snapCounter and return the previous snapCounter
// Get:
//   - Perform a binary search on the trace array of the given index to find the latest value with snapCounter <= snap_id or 0 otherwise

// Complexities:
// Set:
//   - Time => O(1)
// Snap:
//   - Time => O(1)
// Get:
//   - Time => O(log(s)), where s is the number of sets for the given index
// Space => O(l * s), where l is the length of the array and s is the number of sets

class SnapshotArray {
    private readonly traces: number[][][];
    private snapCounter: number;

    constructor(length: number) {
        this.traces = Array.from({ length: length }, () => []);
        this.snapCounter = 0;
    }

    set(index: number, val: number): void {
        this.traces[index].push([val, this.snapCounter]);
    }

    snap(): number {
        this.snapCounter++;
        return this.snapCounter - 1;
    }

    get(index: number, snap_id: number): number {
        const values = this.traces[index];
        let [left, right] = [0, values.length - 1];
        let latestValue = 0;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const [value, snapIdx] = values[mid];
            if (snapIdx <= snap_id) {
                latestValue = value;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return latestValue;
    }
}