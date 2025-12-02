// https://leetcode.com/problems/swim-in-rising-water/

// Hint:
//   - Use a Dijkstra's algorithm approach to find the path with the the minimum maximum height from (0, 0) to (n - 1, n - 1)

// TL;DR:
// Use a Dijkstra's algorithm approach to find the path with the the minimum maximum height from (0, 0) to (n - 1, n - 1)
//   - Initialize a min heap with the starting cell and its height
//   - While the min heap is not empty:
//     - Pop the cell with the smallest height
//     - First pop that reaches the destination cell will have the minimum maximum height which we can return
//     - Basic Djikstra where we go in all 4 directions and add the neighbors to the minHeap accordingly

// Complexities:
// Time => O(n^2 * log(n^2)) => O(n^2 * log(n)), where n is the number of rows and columns in the grid
// Space => O(n^2), where n is the number of rows and columns in the grid

import { MinPriorityQueue } from "@datastructures-js/priority-queue";

function swimInWater(grid: number[][]): number {
	const ROWS = grid.length;
	const COLS = grid[0].length;
	const DIRS = [
		[0, -1],
		[0, 1],
		[-1, 0],
		[1, 0],
	];

	const minHeap = new MinPriorityQueue<[number, [number, number]]>(
		(elem) => elem[0]
	);
	minHeap.enqueue([grid[0][0], [0, 0]]);
	const visited = Array.from({ length: ROWS }, () =>
		Array.from({ length: COLS }, () => false)
	);
	while (!minHeap.isEmpty()) {
		const [max, [r, c]] = minHeap.dequeue();
		if (r === ROWS - 1 && c === COLS - 1) {
			return max;
		}

		if (visited[r][c]) {
			continue;
		}
		visited[r][c] = true;

		for (const [dr, dc] of DIRS) {
			const [newR, newC] = [r + dr, c + dc];
			const inBounds = newR >= 0 && newR < ROWS && newC >= 0 && newC < COLS;
			if (inBounds && !visited[newR][newC]) {
				const height = Math.max(max, grid[newR][newC]);
				minHeap.enqueue([height, [newR, newC]]);
			}
		}
	}

	return -1;
}
