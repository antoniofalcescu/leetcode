// https://leetcode.com/problems/k-closest-points-to-origin/

// TL;DR:
// Use a min heap to store tuples of type [distance, point]
// For each point, calculate the distance from the origin and push the tuple to the min heap
// Pop the k points from the min heap and return them as an array of points

// Complexities:
// Time => O(k * log(n)), where n is the number of points and k is the number of points to return
// Space => O(n), where n is the number of points

import { MinPriorityQueue } from "@datastructures-js/priority-queue";

function kClosest(points: number[][], k: number): number[][] {
	const minHeap = new MinPriorityQueue<[number, number[]]>((elem) => elem[0]);
	for (const point of points) {
		const distance = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
		minHeap.enqueue([distance, point]);
	}

	const ans: number[][] = [];
	for (let i = 0; i < k; i++) {
		const [_, point] = minHeap.dequeue();
		ans.push(point);
	}

	return ans;
}
