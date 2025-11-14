// https://leetcode.com/problems/rotting-oranges/

// TL;DR:
// Iterate once through the grid:
//   - If the cell is a 1, increment the fresh oranges count
//   - If the cell is a 2, add the cell to the BFS queue
// Then, use a BFS approach to traverse the grid for the rotten oranges:
//   - Loop through the queue while it's not empty and we still have fresh oranges in the grid
//       - Get the current queue size and loop through it (so that we loop through all rotten oranges in parallel and increment the iterations correctly)
//       - For each cell, go in all 4 possible directions (up, down, left, right) if we're in bounds and the cell is a 1
//       - If the cell is a 1, decrement the fresh oranges count, add the cell to the BFS queue and mark the cell as 2 to avoid revisiting it
//   - Return -1 if we still have fresh oranges in the grid, otherwise return the number of iterations

// Complexities:
// Time => O(m * n), where m is the number of rows and n is the number of columns in the grid
// Space => O(m * n), where m is the number of rows and n is the number of columns in the grid

function orangesRotting(grid: number[][]): number {
	const ROW = grid.length;
	const COL = grid[0].length;

	const queue = new Queue<number[]>();
	let freshOranges = 0;
	for (let i = 0; i < ROW; i++) {
		for (let j = 0; j < COL; j++) {
			if (grid[i][j] === 1) {
				freshOranges++;
			} else if (grid[i][j] === 2) {
				queue.push([i, j]);
			}
		}
	}

	function bfs() {
		let iterations = 0;
		const DIRS = [
			[0, 1],
			[0, -1],
			[-1, 0],
			[1, 0],
		];

		while (freshOranges && !queue.isEmpty()) {
			const qLength = queue.size();
			for (let i = 0; i < qLength; i++) {
				const [currRow, currCol] = queue.pop()!;
				for (const [dr, dc] of DIRS) {
					const [newRow, newCol] = [currRow + dr, currCol + dc];
					const inBounds =
						newRow >= 0 && newRow < ROW && newCol >= 0 && newCol < COL;

					if (inBounds && grid[newRow][newCol] === 1) {
						freshOranges--;
						queue.push([newRow, newCol]);
						grid[newRow][newCol] = 2;
					}
				}
			}
			iterations++;
		}

		return freshOranges > 0 ? -1 : iterations;
	}

	return bfs();
}
