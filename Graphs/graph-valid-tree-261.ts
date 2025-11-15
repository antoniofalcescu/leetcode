// https://neetcode.io/problems/valid-tree

// TL;DR:
// Convert the edges list to a neighbors map per node (undirected graph)
// Run DFS on the first node (0):
//   - If the node is already in the visited set, return false (cycle detected)
//   - Otherwise, mark the node as visited and recursively call dfs on all its neighbors except its parent (if any neighbor returns false, early return false for the current node)
//   - After the recursive call is done:
//       - Return true for the current node
// If the DFS returns false, return false, otherwise return the comparison between the visited set size and the number of nodes (it's a valid tree if we reached all nodes)

// Complexities:
// Time => O(v + e), where v is the number of nodes and e is the number of edges in the graph
// Space => O(v + e), where v is the number of nodes and e is the number of edges in the graph

class GraphValidTreeSolution {
	/**
	 * @param {number} n
	 * @param {number[][]} edges
	 * @returns {boolean}
	 */
	validTree(n, edges) {
		const neighborsMap = new Map();
		for (let i = 0; i < n; i++) {
			neighborsMap.set(i, []);
		}

		for (const [node1, node2] of edges) {
			neighborsMap.get(node1).push(node2);
			neighborsMap.get(node2).push(node1);
		}

		const visited = new Set();
		function dfs(node, prevNode) {
			if (visited.has(node)) {
				return false;
			}

			visited.add(node);
			for (const neighbor of neighborsMap.get(node)) {
				if (neighbor === prevNode) {
					continue;
				}

				if (!dfs(neighbor, node)) {
					return false;
				}
			}

			return true;
		}

		if (!dfs(0, -1)) {
			return false;
		}

		return visited.size === n;
	}
}
