// https://leetcode.com/problems/min-cost-to-connect-all-points/

// TL;DR:
// Use Prim's MST optimized algorithm
// Create a list of minDist (initially Infinity) and visited (initially false)
// Start with the first point (index 0)
// While we didn't connect all points (visitedNodes < totalNodes):
//   - Find the current unvisited node with the smallest minDist
//   - Process it: mark it as visited, add the distance to the cost and increment the visited nodes counter
//   - Update the minDist for all unvisited nodes with the distance from the current node if this distance is smaller than the current minDist
// Return the total cost

// Complexities:
// Time => O(n^2), where n is the number of points
// Space => O(n), where n is the number of points

function minCostConnectPoints(points: number[][]): number {
	const n = points.length;
	const minDist = Array.from({ length: n }, () => Infinity);
	const visited = Array.from({ length: n }, () => false);

	let visitedNodes = 0;
	let cost = 0;

	minDist[0] = 0;
	while (visitedNodes < n) {
		let currentNode = -1;
		for (let i = 0; i < n; i++) {
			if (visited[i]) {
				continue;
			}
			if (currentNode === -1 || minDist[i] < minDist[currentNode]) {
				currentNode = i;
			}
		}

		visited[currentNode] = true;
		cost += minDist[currentNode];
		visitedNodes++;

		for (let nextNode = 0; nextNode < n; nextNode++) {
			if (visited[nextNode]) {
				continue;
			}
			const dist =
				Math.abs(points[currentNode][0] - points[nextNode][0]) +
				Math.abs(points[currentNode][1] - points[nextNode][1]);
			minDist[nextNode] = Math.min(minDist[nextNode], dist);
		}
	}
	return cost;
}
