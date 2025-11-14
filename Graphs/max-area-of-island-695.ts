// https://leetcode.com/problems/max-area-of-island/

// TL;DR:
// Use a BFS approach to traverse the grid
// For each cell that is a 1, we use a bfs to:
//   - add the cell to the BFS queue
//   - mark the cell as 0 to avoid revisiting it
//   - increment the size of the current island
//   - go in all 4 possible directions (up, down, left, right) if we're in bounds and the cell is a 1
//   - repeat the process until the BFS queue is empty
// We return the maximum size of an island if the last BFS returned a size greater than current max

// Complexities:
// Time => O(m * n), where m is the number of rows and n is the number of columns in the grid
// Space => O(m * n), where m is the number of rows and n is the number of columns in the grid

function maxAreaOfIsland(grid: number[][]): number {
	const ROW = grid.length;
	const COL = grid[0].length;

	const queue = new Queue<number[]>();

	function bfs(row: number, col: number) {
		const DIRS = [
			[0, 1],
			[0, -1],
			[-1, 0],
			[1, 0],
		];

		queue.push([row, col]);
		grid[row][col] = 0;

		let size = 0;
		while (!queue.isEmpty()) {
			const [currRow, currCol] = queue.pop()!;
			size++;
			for (const [dr, dc] of DIRS) {
				const [newRow, newCol] = [currRow + dr, currCol + dc];
				const inBounds =
					newRow >= 0 && newRow < ROW && newCol >= 0 && newCol < COL;
				if (inBounds && grid[newRow][newCol] === 1) {
					queue.push([newRow, newCol]);
					grid[newRow][newCol] = 0;
				}
			}
		}

		return size;
	}

	let ans = 0;
	for (let i = 0; i < ROW; i++) {
		for (let j = 0; j < COL; j++) {
			if (grid[i][j] === 1) {
				const size = bfs(i, j);
				ans = Math.max(ans, size);
			}
		}
	}

	return ans;
}
