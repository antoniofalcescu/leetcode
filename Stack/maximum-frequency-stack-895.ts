// https://leetcode.com/problems/maximum-frequency-stack/

// Hint:
// - Bucket sort approach

// TL;DR:
// Use a frequency map to store the frequency of each value
// Use a buckets array to push the value to its frequency bucket (trick here is to keep the value in all buckets <= freq)
// Use a max frequency variable to store the maximum frequency
// Push:
//   - Increment the frequency of the value in the frequency map
//   - Update the max frequency with max(maxFreq, newFreq)
//   - If the buckets array is not long enough, push a new empty bucket
//   - Push the value to the bucket at the new frequency
// Pop:
//   - Get the bucket at the maximum frequency
//   - Pop the value from the bucket
//   - Decrement the frequency of the value in the frequency map
//   - If the bucket is empty now, pop the whole bucket and decrement the max frequency
//   - Return the value

// Complexities:
// Time => O(1) for push and pop
// Space => O(n), where n is the number of unique values

class FreqStack {
	private readonly freqMap: Record<number, number>;
	private readonly buckets: number[][];
	private maxFreq: number;

	constructor() {
		this.freqMap = {};
		this.maxFreq = 0;
		this.buckets = [[]];
	}

	push(val: number): void {
		const newFreq = (this.freqMap[val] ?? 0) + 1;
		this.freqMap[val] = newFreq;
		this.maxFreq = Math.max(this.maxFreq, newFreq);
		if (this.buckets.length === newFreq) {
			this.buckets.push([]);
		}
		this.buckets[newFreq].push(val);
	}

	pop(): number {
		const maxFreqBucket = this.buckets[this.maxFreq];
		const value = maxFreqBucket.pop()!;
		this.freqMap[value]--;
		if (maxFreqBucket.length === 0) {
			this.buckets.pop();
			this.maxFreq--;
		}

		return value;
	}
}
