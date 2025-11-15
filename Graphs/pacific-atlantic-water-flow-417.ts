// https://leetcode.com/problems/pacific-atlantic-water-flow/

// TL;DR:
// Keep 1 set for each ocean and start from the matrix edges (ocean bordering cells) and use a DFS to traverse the grid and find all cells that can flow to the ocean
// Inside the DFS:
//   - add the cell to the current ocean set
//   - go in all 4 possible directions and if we're in bounds and the neighbor cell height >= current cell height and not already in the ocean set, call dfs on the neighbor
// After the DFS is done, we return the cells that are in both the Pacific and Atlantic oceans sets

// Complexities:
// Time => O(n * m), where n is the number of rows and m is the number of columns in the grid
// Space => O(n * m), where n is the number of rows and m is the number of columns in the grid

function parseForSet(r: number, c: number): string {
	return `${r},${c}`;
}

function pacificAtlantic(heights: number[][]): number[][] {
	const ROW = heights.length;
	const COL = heights[0].length;

	const atlantic = new Set<string>();
	const pacific = new Set<string>();

	function dfs(r: number, c: number, ocean: Set<string>): void {
		const DIRS = [
			[0, -1],
			[0, 1],
			[-1, 0],
			[1, 0],
		];

		ocean.add(parseForSet(r, c));
		for (const [dr, dc] of DIRS) {
			const [newR, newC] = [r + dr, c + dc];
			const inBounds = newR >= 0 && newR < ROW && newC >= 0 && newC < COL;
			const parsedRC = parseForSet(newR, newC);
			if (
				inBounds &&
				!ocean.has(parsedRC) &&
				heights[newR][newC] >= heights[r][c]
			) {
				dfs(newR, newC, ocean);
			}
		}
	}

	for (let c = 0; c < COL; c++) {
		dfs(0, c, pacific);
		dfs(ROW - 1, c, atlantic);
	}

	for (let r = 0; r < ROW; r++) {
		dfs(r, 0, pacific);
		dfs(r, COL - 1, atlantic);
	}

	const ans: [number, number][] = [];
	for (const elem of pacific) {
		if (atlantic.has(elem)) {
			ans.push(elem.split(",").map(Number) as [number, number]);
		}
	}

	return ans;
}
