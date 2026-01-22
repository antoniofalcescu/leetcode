// https://leetcode.com/problems/shortest-path-with-alternating-colors/

// TL;DR:
// Build the adjacency list based on the red and blue edges (for each node, add the neighbors and the color of the edge)
// Initialize the BFS queue with 0 and empty string (no previous edge color) and visited set and keep track of the distance
// While the queue is not empty:
//   - Get the whole queue size to loop through all nodes in the current level:
//      - Pop the current node and color
//      - If the current [node, color] pair has been already visited, skip it
//      - Add the [node, color] pair to the visited set and update the answer distance with the current distance if it's not already set (!== -1)
//      - For each neighbor of the current node, if the neighbor edge color is different from the current color, add the neighbor and its color to the queue
// Return the answer array

// Complexities:
// Time => O(n + m), where n is the number of nodes and m is the number of edges
// Space => O(n + m), where n is the number of nodes and m is the number of edges

function shortestAlternatingPaths(
	n: number,
	redEdges: number[][],
	blueEdges: number[][]
): number[] {
	const adjList = new Map<number, [number, string][]>();
	for (let i = 0; i < n; i++) {
		adjList.set(i, []);
	}
	for (const [from, to] of redEdges) {
		adjList.get(from)!.push([to, "R"]);
	}
	for (const [from, to] of blueEdges) {
		adjList.get(from)!.push([to, "B"]);
	}

	const ans = Array.from({ length: n }, () => -1);
	const queue = new Queue<[number, string]>([[0, ""]]);
	const visited = new Set<string>();
	let distance = 0;
	while (!queue.isEmpty()) {
		const size = queue.size();
		for (let i = 0; i < size; i++) {
			const [node, color] = queue.pop();
			const visitedKey = [node, color].join(",");
			if (visited.has(visitedKey)) {
				continue;
			}
			visited.add(visitedKey);
			if (ans[node] === -1) {
				ans[node] = distance;
			}

			for (const [nei, neiColor] of adjList.get(node)!) {
				if (neiColor === color) {
					continue;
				}
				queue.push([nei, neiColor]);
			}
		}
		distance++;
	}

	return ans;
}
