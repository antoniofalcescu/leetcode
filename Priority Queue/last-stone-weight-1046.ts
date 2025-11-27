// https://leetcode.com/problems/last-stone-weight/

// Hint:
// - Use an optimal data structure that efficiently gets the max element

// TL;DR:
// Using a max heap (min heap with negative numbers)
// Iterate through the heap while we have at least 2 elements and pop the top 2 elements
// If they are not equal push back to the heap the difference of them
// Return the last element or 0 if there isn't one

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(n), where n is the length of the input array

import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

function lastStoneWeight(stones: number[]): number {
	const maxHeap = new MaxPriorityQueue<number>();
	for (const stone of stones) {
		maxHeap.enqueue(stone);
	}
	while (maxHeap.size() > 1) {
		const [first, second] = [maxHeap.dequeue(), maxHeap.dequeue()];
		if (first - second > 0) {
			maxHeap.enqueue(first - second);
		}
	}

	return maxHeap.size() === 1 ? maxHeap.front() : 0;
}
