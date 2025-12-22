// https://leetcode.com/problems/minimum-height-trees/

// TL;DR:
// The main idea is to figure out that we can have at moste 2 MHTs roots regardless of edges
// Initialize the adjacency list based on the input edges
// Create an outgoing edges count map based on the adjacency list
// Create a queue of leaves (nodes with only 1 edge) based on the adjacency list
// Use a Topological BFS approach to remove leaves until we have at most 2 nodes left
//   - While the number of nodes is greater than 2:
//     - Pop all leaves from the queue (whole level)
//     - Decrement the number of nodes by 1 (the popped leaf)
//     - For each neighbor of the popped leaf, decrement its outgoing edges count
//     - If a neighbor has now 1 outgoing edge, add it to the leaves queue
//   - Return the leaves

// Complexities:
// Time => O(v + e), where v is the number of nodes and e is the number of edges in the graph
// Space => O(v), where v is the number of nodes in the graph

function findMinHeightTrees(n: number, edges: number[][]): number[] {
	if (n === 1) {
		return [0];
	}

	const adjList: Record<number, number[]> = {};
	for (const [n1, n2] of edges) {
		if (!adjList[n1]) {
			adjList[n1] = [];
		}
		if (!adjList[n2]) {
			adjList[n2] = [];
		}
		adjList[n1].push(n2);
		adjList[n2].push(n1);
	}

	const outgoingEdges: Record<number, number> = {};
	const leaves = new Queue<number>();
	for (const [node, neis] of Object.entries(adjList)) {
		outgoingEdges[node] = neis.length;
		if (neis.length === 1) {
			leaves.push(Number(node));
		}
	}

	while (n > 2) {
		const size = leaves.size();
		for (let i = 0; i < size; i++) {
			const leaf = leaves.pop();
			n--;
			for (const nei of adjList[leaf]) {
				outgoingEdges[nei]--;
				if (outgoingEdges[nei] === 1) {
					leaves.push(Number(nei));
				}
			}
		}
	}

	return leaves.toArray();
}
