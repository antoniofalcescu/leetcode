// https://leetcode.com/problems/kth-largest-element-in-a-stream/

// TL;DR:
// Using a min heap to keep track of the first k elements always and have the lowest element as the first one:
//  - in the constructor iterate through nums and push each element to the heap while popping the smallest if we overflow over k
//  - in the add method push the new elem in the heap and if we overflow over k pop the lowest again, then return the first element from the heap (the currently lowest)

// Complexities:
// Time => O(n * log(k)), where n is the length of nums and k is the input number (size of the heap)
// Space => O(k), where k is the input number (size of the heap)

import { MinPriorityQueue } from "@datastructures-js/priority-queue";

class KthLargest {
	private readonly minHeap: MinPriorityQueue<number>;
	private readonly k: number;

	constructor(k: number, nums: number[]) {
		this.k = k;

		this.minHeap = new MinPriorityQueue();
		for (const num of nums) {
			this.minHeap.enqueue(num);
			if (this.minHeap.size() > k) {
				this.minHeap.dequeue();
			}
		}
	}

	add(val: number): number {
		this.minHeap.enqueue(val);
		if (this.minHeap.size() > this.k) {
			this.minHeap.dequeue();
		}
		return this.minHeap.front();
	}
}
