// https://leetcode.com/problems/clone-graph/

// TL;DR:
// Use a oldToNew map + DFS approach to traverse the graph
// For each node:
//   - If the node is in the map, return the new node
//   - Otherwise:
//     - create a new node, add it to the map and recursively call dfs on the neighbors
//     - After recursive call is done and call stack comes back, add the new coopied node to the neighbors of the current node
//     - Return the new node
// Return the new head node using the oldToNew map (set null at the start to cover null edge case)

// Complexities:
// Time => O(n), where n is the number of nodes in the graph
// Space => O(n), where n is the number of nodes in the graph

function cloneGraph(node: AdjacencyListNode | null): AdjacencyListNode | null {
	const oldToNew = new Map();
	oldToNew.set(null, null);

	function dfs(node: AdjacencyListNode | null): AdjacencyListNode | null {
		if (oldToNew.has(node)) {
			return oldToNew.get(node);
		}

		const copy = new AdjacencyListNode(node!.val);
		oldToNew.set(node, copy);
		for (const nei of node!.neighbors) {
			copy.neighbors.push(dfs(nei)!);
		}

		return copy;
	}

	dfs(node);
	return oldToNew.get(node);
}
