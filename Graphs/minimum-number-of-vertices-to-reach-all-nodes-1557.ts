// https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/

// TL;DR:
// Basically, find the nodes that don't have any incoming edges (if a node has an incoming edge, it means some other node can reach it)
// Build the incoming edges count array
// Iterate through the incoming edges count array and add the nodes with 0 incoming edges to the answer
// Return the answer

// Complexities:
// Time => O(n + m), where n is the number of nodes and m is the number of edges
// Space => O(n), where n is the number of nodes

function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
	const incoming = Array.from({ length: n }, () => 0);
	for (const [from, to] of edges) {
		incoming[to]++;
	}

	const ans = [];
	for (let i = 0; i < n; i++) {
		if (incoming[i] === 0) {
			ans.push(i);
		}
	}

	return ans;
}
