// https://leetcode.com/problems/increment-submatrices-by-one/

// TL;DR:
// Initialize 2 matrices:
//   - m: ans matrix where we'll use diff matrix and prefix sum to calculate each value
//   - diff: to store the difference values (with extra row and column to avoid index out of bounds)
// Iterate through the queries and update the difference matrix based on the following logic:
//   - top left corner increment by 1
//   - first element outside on the top left row and bottom right column + 1 decrement by 1
//   - first element outside on the bottom left row  + 1 and top left column decrement by 1
//   - first element outside on the diagonal bottom right corner + 1 increment by 1
// Iterate through the matrix and calculate each value using the difference matrix and prefix sum:
//   - formula: m[i][j] = m[i][j] + diff[i][j] + top + left - topLeft (also take into account the case where i or j is 0)
// Return the final matrix

// Complexities:
// Time => O(q + n^2), where q is the number of queries and n is the size of the matrix
// Space => O(n^2), where n is the size of the matrix

function rangeAddQueries(n: number, queries: number[][]): number[][] {
	const m: number[][] = [];
	for (let i = 0; i < n; i++) {
		const row: number[] = [];
		for (let j = 0; j < n; j++) {
			row.push(0);
		}
		m.push(row);
	}

	const diff: number[][] = [];
	for (let i = 0; i < n + 1; i++) {
		const row: number[] = [];
		for (let j = 0; j < n + 1; j++) {
			row.push(0);
		}
		diff.push(row);
	}

	for (const [tlr, tlc, brr, brc] of queries) {
		diff[tlr][tlc]++;
		diff[tlr][brc + 1]--;
		diff[brr + 1][tlc]--;
		diff[brr + 1][brc + 1]++;
	}

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			const top = i > 0 ? m[i - 1][j] : 0;
			const left = j > 0 ? m[i][j - 1] : 0;
			const topLeft = i * j > 0 ? m[i - 1][j - 1] : 0;

			m[i][j] = m[i][j] + diff[i][j] + top + left - topLeft;
		}
	}

	return m;
}
