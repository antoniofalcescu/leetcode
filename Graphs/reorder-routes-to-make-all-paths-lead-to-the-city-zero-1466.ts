// https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/

// TL;DR:
// Main idea is to treat the graph as undirected and do a BFS traversal from 0 to all nodes and increment the answer whenever we find a route that has the opposite direction
// Build the directed and undirected adjacency lists
// Initialize the BFS queue and visited set with 0 and keep track of the number of swaps (answer)
// While the queue is not empty:
//   - Pop the current city
//   - For each UNDIRECTED neighbor of the current city:
//     - If the neighbor has been already visited, skip it
//     - If the current neighbor can't reach the current city via the directed adjacency list, increment the swaps counter
//     - Add the neighbor to the queue and mark it as visited
// Return the number of swaps

// Complexities:
// Time => O(n + m), where n is the number of cities and m is the number of connections
// Space => O(n + m), where n is the number of cities and m is the number of connections

import { Queue } from "@datastructures-js/queue";

function minReorder(n: number, connections: number[][]): number {
	const directedAdjList = new Map<number, Set<number>>();
	const undirectedAdjList = new Map<number, number[]>();
	for (let i = 0; i < n; i++) {
		directedAdjList.set(i, new Set<number>());
		undirectedAdjList.set(i, []);
	}

	for (const [from, to] of connections) {
		directedAdjList.get(from)!.add(to);
		undirectedAdjList.get(from)!.push(to);
		undirectedAdjList.get(to)!.push(from);
	}

	const queue = new Queue<number>([0]);
	const visited = new Set<number>([0]);
	let swaps = 0;
	while (!queue.isEmpty()) {
		const city = queue.pop();
		for (const nei of undirectedAdjList.get(city)!) {
			if (visited.has(nei)) {
				continue;
			}

			if (!directedAdjList.get(nei)!.has(city)) {
				swaps++;
			}
			queue.push(nei);
			visited.add(nei);
		}
	}

	return swaps;
}
