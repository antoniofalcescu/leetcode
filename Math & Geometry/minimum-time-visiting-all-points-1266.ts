// https://leetcode.com/problems/minimum-time-visiting-all-points/

// TL;DR:
// For each pair of consecutive points, calculate the Chebyshev distance between them = max(abs(x1 - x2), abs(y1 - y2))
// Add the Chebyshev distance to the total time
// Return the total time

// Complexities:
// Time => O(n), where n is the number of points
// Space => O(1)

function minTimeToVisitAllPoints(points: number[][]): number {
	let ans = 0;
	for (let i = 0; i < points.length - 1; i++) {
		const src = points[i];
		const dst = points[i + 1];
		const chebyshev = Math.max(
			Math.abs(src[0] - dst[0]),
			Math.abs(src[1] - dst[1])
		);
		ans += chebyshev;
	}
	return ans;
}
