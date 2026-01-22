// https://leetcode.com/problems/shortest-path-in-binary-matrix/

// TL;DR:
// Since the grid is basically a unweighted graph, we don't need Djikstra, BFS is enough to find the shortest path
// Initialize the BFS queue with (0, 0) and the visited matrix
// Keep track of the path length initialized to 0
// While the queue is not empty:
//   - Increment the path length and loop through all nodes in the current level:
//     - Pop the current node
//     - If the popped node is out of bounds, visited or a 1, skip it
//     - If the popped node is the destination cell (n - 1, n - 1), return the path length
//     - Otherwise, add the popped node to the visited set and add all its neighbors to the queue
// Return -1 if we didn't early return the path length in the queue loop

// Complexities:
// Time => O(n^2), where n is the number of rows and columns
// Space => O(n^2), where n is the number of rows and columns

import { Queue } from "@datastructures-js/queue";

function shortestPathBinaryMatrix(grid: number[][]): number {
	const ROWS = grid.length;
	const COLS = grid[0].length;
	const DIRS = [
		[0, -1],
		[0, 1],
		[-1, 0],
		[1, 0],
		[-1, 1],
		[-1, -1],
		[1, -1],
		[1, 1],
	];

	const queue = new Queue<[number, number]>([[0, 0]]);
	const visited = Array.from({ length: ROWS }, () =>
		Array.from({ length: COLS }, () => false)
	);
	let pathLength = 0;
	while (!queue.isEmpty()) {
		pathLength++;
		const size = queue.size();
		for (let i = 0; i < size; i++) {
			const [r, c] = queue.pop();
			const inBounds = r >= 0 && r < ROWS && c >= 0 && c < COLS;
			if (!inBounds || visited[r][c] || grid[r][c] === 1) {
				continue;
			}
			visited[r][c] = true;

			if (r === ROWS - 1 && c === COLS - 1) {
				return pathLength;
			}

			for (const [dr, dc] of DIRS) {
				queue.push([r + dr, c + dc]);
			}
		}
	}

	return -1;
}
