// https://leetcode.com/problems/k-closest-points-to-origin/

// TL;DR:
// Use a max heap to store the points based on the distance from the origin
// Iterate through the points and enqueue them to the heap while popping the farthest if we overflow over k
// Return the heap as an array

// Complexities:
// Time => O(n * log(k)), where n is the number of points and k is the number of points to return
// Space => O(k), where k is the number of points to return

import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

function kClosest(points: number[][], k: number): number[][] {
	const maxHeap = new MaxPriorityQueue<number[]>((elem) =>
		Math.sqrt(Math.pow(elem[0], 2) + Math.pow(elem[1], 2))
	);
	for (const point of points) {
		maxHeap.enqueue(point);
		if (maxHeap.size() > k) {
			maxHeap.dequeue();
		}
	}

	return maxHeap.toArray();
}
