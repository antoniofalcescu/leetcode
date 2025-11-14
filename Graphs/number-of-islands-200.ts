// https://leetcode.com/problems/number-of-islands/

// TL;DR:
// Use a BFS approach to traverse the grid
// For each cell that is a "1", we use a bfs to:
//   - add the cell to the BFS queue
//   - mark the cell as "0" to avoid revisiting it
//   - go in all 4 possible directions (up, down, left, right) if we're in bounds and the cell is a "1"
//   - repeat the process until the BFS queue is empty
// We increment the number of islands for each cell that is the first "1" from a new island
// We return the number of islands

// Complexities:
// Time => O(m * n), where m is the number of rows and n is the number of columns in the grid
// Space => O(m * n), where m is the number of rows and n is the number of columns in the grid

function numIslands(grid: string[][]): number {
	const row = grid.length;
	const col = grid[0].length;

	const queue = new Queue<number[]>();

	function bfs(r: number, c: number) {
		const dirs = [
			[0, -1],
			[0, 1],
			[-1, 0],
			[1, 0],
		];

		queue.push([r, c]);
		grid[r][c] = "0";

		while (!queue.isEmpty()) {
			const [currR, currC] = queue.pop()!;
			for (const [dr, dc] of dirs) {
				const [newR, newC] = [currR + dr, currC + dc];
				const inBounds = newR >= 0 && newR < row && newC >= 0 && newC < col;
				if (inBounds && grid[newR][newC] === "1") {
					queue.push([newR, newC]);
					grid[newR][newC] = "0";
				}
			}
		}
	}

	let islands = 0;
	for (let i = 0; i < row; i++) {
		for (let j = 0; j < col; j++) {
			if (grid[i][j] === "1") {
				islands++;
				bfs(i, j);
			}
		}
	}

	return islands;
}
