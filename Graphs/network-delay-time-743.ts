// https://leetcode.com/problems/network-delay-time/

// TL;DR:
// Djikstra's algorithm
// Initialize the adjacency list based on the edges
// Initialize a min heap with the starting node and its weight
// While the priority queue is not empty:
//   - Dequeue the node with the smallest weight
//   - If the node has already been visited, skip it
//   - Otherwise, add the node to the visited set and update the time if the current weight is greater than the current max time
//   - For each neighbor of the current node, add the neighbor and its newly calculated weight to the min heap
// Return the time if all nodes have been visited, otherwise return -1

// Complexities:
// Time => O(e * log(v)), where e is the number of edges and v is the number of vertices
// Space => O(e + v), where e is the number of edges and v is the number of vertices

import { MinPriorityQueue } from "@datastructures-js/priority-queue";

function networkDelayTime(times: number[][], n: number, k: number): number {
	const adjList = new Map();
	for (let i = 1; i <= n; i++) {
		adjList.set(i, []);
	}

	for (const [source, target, weight] of times) {
		adjList.get(source).push([target, weight]);
	}

	const minHeap = new MinPriorityQueue<number[]>((entry) => entry[1]);
	minHeap.enqueue([k, 0]);
	const visited = new Set<number>();
	let time = 0;

	while (!minHeap.isEmpty()) {
		const [node, weight] = minHeap.dequeue();

		if (visited.has(node)) {
			continue;
		}

		visited.add(node);
		time = Math.max(time, weight);

		for (const [neighbor, neighborWeight] of adjList.get(node)) {
			if (!visited.has(neighbor)) {
				minHeap.enqueue([neighbor, weight + neighborWeight]);
			}
		}
	}

	return visited.size === n ? time : -1;
}
