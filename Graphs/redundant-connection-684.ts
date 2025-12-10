// https://neetcode.io/problems/redundant-connection

// TL;DR:
// Use a union find approach to build the tree from the edges and return the redundant edge when we find 2 nodes with the same parent already (cycle)
// For each node, initialize the parent and rank arrays (parent[i] = i and rank[i] = 1)
// For each edge, union the two nodes
// If the union returns false (same parent), update the answer edge with the current edge (to track the last redundant edge)
// Return the answer edge

// Complexities:
// Time => O(n + e), where n is the number of nodes and e is the number of edges in the graph
// Space => O(n), where n is the number of nodes in the graph

function findRedundantConnection(edges: number[][]): number[] {
	const parents: number[] = [];
	const ranks: number[] = [];

	for (let i = 1; i <= edges.length; i++) {
		parents[i] = i;
		ranks[i] = 1;
	}

	function find(node: number): number {
		let copy = node;
		while (copy !== parents[copy]) {
			parents[copy] = parents[parents[copy]];
			copy = parents[copy];
		}

		return copy;
	}

	function union(n1: number, n2: number): boolean {
		const p1 = find(n1);
		const p2 = find(n2);

		if (p1 === p2) {
			return false;
		}

		if (ranks[p1] > ranks[p2]) {
			parents[p2] = p1;
			ranks[p1] += ranks[p2];
		} else {
			parents[p1] = p2;
			ranks[p2] += ranks[p1];
		}

		return true;
	}

	let ans: number[] = [];
	for (const [n1, n2] of edges) {
		if (!union(n1, n2)) {
			ans = [n1, n2];
		}
	}

	return ans;
}
