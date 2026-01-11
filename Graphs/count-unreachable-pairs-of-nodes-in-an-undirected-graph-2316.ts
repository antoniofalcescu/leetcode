// https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/

// TL;DR:
// Use a union find approach to build the parents/ranks arrays of the components in the graph
// For each edge, union the two nodes
// For each node, find it's parent and add the number of unreachable nodes to the answer (N - rank[parent])
// Return the answer divided by 2 as we count each pair twice

// Complexities:
// Time => O(n + e), where n is the number of nodes and e is the number of edges in the graph
// Space => O(n), where n is the number of nodes in the graph

function countPairs(n: number, edges: number[][]): number {
	const parents = Array.from({ length: n }, (_, i) => i);
	const ranks = Array.from({ length: n }, () => 1);

	function find(node: number): number {
		while (node !== parents[node]) {
			parents[node] = parents[parents[node]];
			node = parents[node];
		}
		return node;
	}

	function union(node1: number, node2: number): void {
		const parent1 = find(node1);
		const parent2 = find(node2);

		if (parent1 === parent2) {
			return;
		}

		if (ranks[parent1] >= ranks[parent2]) {
			parents[parent2] = parent1;
			ranks[parent1] += ranks[parent2];
		} else {
			parents[parent1] = parent2;
			ranks[parent2] += ranks[parent1];
		}
	}

	for (const [node1, node2] of edges) {
		union(node1, node2);
	}

	let ans = 0;
	for (let i = 0; i < n; i++) {
		const parent = find(i);
		ans += n - ranks[parent];
	}

	return ans / 2;
}
