// https://leetcode.com/problems/flood-fill/

// TL;DR:
// Use a BFS approach to traverse the grid
// Initialize the BFS queue with the starting cell and save the original color
// While the queue is not empty:
//   - Pop the current cell
//   - If the cell is the same color as the target color, skip it
//   - Mark the cell as the new color
//   - Go in all 4 possible directions (up, down, left, right) if we're in bounds and the cell is the same color as the starting cell
// We return the modified grid

// Complexities:
// Time => O(m * n), where m is the number of rows and n is the number of columns in the grid
// Space => O(m * n), where m is the number of rows and n is the number of columns in the grid

function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    const ROWS = image.length;
    const COLS = image[0].length;
    const DIRS = [
        [0, -1],
        [0, 1],
        [1, 0],
        [-1, 0],
    ];

    const originalColor = image[sr][sc];
    const queue = new Queue<[number, number]>([[sr, sc]]);
    while (!queue.isEmpty()) {
        const [r, c] = queue.pop();
        if (image[r][c] === color) {
            continue;
        }
        
        image[r][c] = color;

        for (const [dr, dc] of DIRS) {
            const [newR, newC] = [r + dr, c + dc];
            const inBounds = newR >= 0 && newR < ROWS && newC >= 0 && newC < COLS;
            if (inBounds && image[newR][newC] === originalColor) {
                queue.push([newR, newC]);
            }
        }
    }

    return image;
};