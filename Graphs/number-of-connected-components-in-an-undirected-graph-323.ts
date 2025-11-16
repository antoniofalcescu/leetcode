// https://neetcode.io/problems/count-connected-components

// TL;DR:
// Use a union find approach to find the number of connected components in the graph
// For each node, initialize the parent and rank arrays (parent[i] = i and rank[i] = 1)
// For each edge, union the two nodes
// Return the number of connected components

// Complexities:
// Time => O(n + e), where n is the number of nodes and e is the number of edges in the graph
// Space => O(n), where n is the number of nodes in the graph

class NumberOfConnectedComponentsInAnUndirectedGraphSolution {
	/**
	 * @param {number} n
	 * @param {number[][]} edges
	 * @returns {number}
	 */
	countComponents(n, edges) {
		const parents: number[] = [];
		const ranks: number[] = [];
		for (let i = 0; i < n; i++) {
			parents[i] = i;
			ranks[i] = 1;
		}

		function find(node) {
			let copy = node;

			while (copy !== parents[copy]) {
				parents[copy] = parents[parents[copy]];
				copy = parents[copy];
			}

			return copy;
		}

		function union(node1, node2) {
			const parent1 = find(node1);
			const parent2 = find(node2);

			if (parent1 === parent2) {
				return 0;
			}

			if (ranks[parent1] > ranks[parent2]) {
				parents[parent2] = parent1;
				ranks[parent1] += ranks[parent2];
			} else {
				parents[parent1] = parent2;
				ranks[parent2] += ranks[parent1];
			}

			return 1;
		}

		let components = n;
		for (const [node1, node2] of edges) {
			components -= union(node1, node2);
		}
		return components;
	}
}
