// https://leetcode.com/problems/graph-valid-tree/

// TL;DR:
// Use a union find algorithm to check if the graph is connected and has no cycles
// Initialize the parents and ranks arrays
// For each node, set the parent to itself and the rank to 1
// For each edge, union the 2 nodes
// If the 2 nodes are already in the same set, return false
// Return true if the number of components is 1

// Complexities:
// Time => O(e * a(v)), where e is the number of edges and v is the number of vertices (a(v) is the inverse Ackermann function which is amortized <= 4 for any n)
// Space => O(v), where v is the number of vertices

class GraphValidTreeSolution {
	/**
	 * @param {number} n
	 * @param {number[][]} edges
	 * @returns {boolean}
	 */
	validTree(n, edges) {
		const parents: number[] = [];
		const ranks: number[] = [];
		for (let i = 0; i < n; i++) {
			parents[i] = i;
			ranks[i] = 1;
		}

		function find(node) {
			while (node !== parents[node]) {
				parents[node] = parents[parents[node]];
				node = parents[node];
			}
			return node;
		}

		function union(node1, node2) {
			const parent1 = find(node1);
			const parent2 = find(node2);

			if (parent1 === parent2) {
				return false;
			}
			if (ranks[parent1] >= ranks[parent2]) {
				parents[parent2] = parent1;
				ranks[parent1] += ranks[parent2];
			} else {
				parents[parent1] = parent2;
				ranks[parent2] += ranks[parent1];
			}

			return true;
		}

		let components = n;
		for (const [node1, node2] of edges) {
			if (!union(node1, node2)) {
				return false;
			}
			components--;
		}

		return components === 1;
	}
}
