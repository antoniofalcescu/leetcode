// https://leetcode.com/problems/path-with-minimum-effort/

// TL;DR:
// Use a Dijkstra's algorithm approach to find the path with the minimum maximum height diff between adjacent cells from (0, 0) to (n - 1, n - 1)
//   - Initialize a min heap with the starting cell and its height difference (0)
//   - While the min heap is not empty:
//     - Pop the cell with the smallest height difference
//     - First pop that reaches the destination cell will have the minimum maximum height difference which we can return
//     - Basic Djikstra where we go in all 4 directions and add the neighbors to the minHeap accordingly

// Complexities:
// Time => O(n * m * log(n * m)) => O(n * m * log(n * m)), where n is the number of rows and m is the number of columns in the grid
// Space => O(n * m), where n is the number of rows and m is the number of columns in the grid

function minimumEffortPath(heights: number[][]): number {
    const ROWS = heights.length;
    const COLS = heights[0].length;
    const DIRS = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
    ];

    const minHeap = new MinPriorityQueue<[number, number, number]>((elem) => elem[0]);
    const visited = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => false));
    minHeap.enqueue([0, 0, 0]);
    while (!minHeap.isEmpty()) {
        const [diff, r, c] = minHeap.dequeue();
        if (r === ROWS - 1 && c === COLS - 1) {
            return diff;
        }
        if (visited[r][c]) {
            continue;
        }
        visited[r][c] = true;

        for (const [dr, dc] of DIRS) {
            const [newR, newC] = [r + dr, c + dc];
            const inBounds = newR >= 0 && newR < ROWS && newC >= 0 && newC < COLS;
            if (inBounds && !visited[newR][newC]) {
                const newDiff = Math.abs(heights[r][c] - heights[newR][newC]);
                minHeap.enqueue([Math.max(diff, newDiff), newR, newC])
            }
        }
    }
};