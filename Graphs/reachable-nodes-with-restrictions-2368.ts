// https://leetcode.com/problems/reachable-nodes-with-restrictions/

// TL;DR:
// Build the adjacency list based on the edges
// Initialize the BFS queue with 0 and the visited set and restricted set (convert the restricted array to a set for O(1) lookups)
// While the queue is not empty:
//   - Pop the current node
//   - If the node has been already visited or is restricted, skip it
//   - Add the node to the visited set
//   - For each neighbor of the current node, add the neighbor to the queue
// Return the size of the visited set

// Complexities:
// Time => O(n + m), where n is the number of nodes and m is the number of edges
// Space => O(n + m), where n is the number of nodes and m is the number of edges

function reachableNodes(
	n: number,
	edges: number[][],
	restricted: number[]
): number {
	const adjList = new Map<number, number[]>();
	for (let i = 0; i < n; i++) {
		adjList.set(i, []);
	}
	for (const [node1, node2] of edges) {
		adjList.get(node1)!.push(node2);
		adjList.get(node2)!.push(node1);
	}

	const queue = new Queue<number>([0]);
	const visited = new Set<number>();
	const restrictedSet = new Set<number>(restricted);
	while (!queue.isEmpty()) {
		const node = queue.pop();
		if (visited.has(node) || restrictedSet.has(node)) {
			continue;
		}
		visited.add(node);

		for (const nei of adjList.get(node)!) {
			queue.push(nei);
		}
	}

	return visited.size;
}
