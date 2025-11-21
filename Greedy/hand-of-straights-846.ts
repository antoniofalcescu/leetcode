// https://leetcode.com/problems/hand-of-straights/

// TL;DR:
// Use a greedy approach
//   - First check if the length of the hand is not divisible by the group size, if so, return false (impossible to form groups)
//   - Initialize a frequency map and a min heap with all unique numbers
//   - While we have elements in the min heap:
//     - Check the first element in the heap and try to use it to form a group of groupSize elements:
//       - If the next element is not in the frequency map or has a frequency of 0, return false
//       - Decrement the frequency of each element used in this group and if it reaches 0, pop an element from the min heap (if the popped element is not the same as the currently used one, return false)
//   - Return true if the min heap is empty

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(n), where n is the length of the input array

import { MinPriorityQueue } from "@datastructures-js/priority-queue";

function isNStraightHand(hand: number[], groupSize: number): boolean {
	if (hand.length % groupSize !== 0) {
		return false;
	}

	const freqMap: Record<number, number> = {};
	for (const num of hand) {
		freqMap[num] = (freqMap[num] ?? 0) + 1;
	}

	const minHeap = new MinPriorityQueue<number>();
	for (const num of Object.keys(freqMap)) {
		minHeap.enqueue(Number(num));
	}

	while (!minHeap.isEmpty()) {
		const min = minHeap.front();
		for (let i = 0; i < groupSize; i++) {
			const num = min + i;
			if (freqMap[num] === undefined || freqMap[num] === 0) {
				return false;
			}
			freqMap[num]--;
			if (freqMap[num] === 0) {
				if (num !== minHeap.front()) {
					return false;
				}
				minHeap.dequeue();
			}
		}
	}

	return true;
}
