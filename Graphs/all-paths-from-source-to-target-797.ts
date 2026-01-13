// https://leetcode.com/problems/all-paths-from-source-to-target/

// TL;DR:
// Use a DFS approach:
//   - Initialize the DFS function with the starting node and an empty path
//   - Base case: if the current node is the target, add the path to the answer and return
//   - Recursive case:
//     - Add the current node to the path
//     - For each neighbor of the current node, recursively call the DFS function with the neighbor and the path
//     - Pop the current node from the path
// Return the answer

// Complexities:
// Time => O(n * 2^n), where n is the number of nodes in the graph
// Space => O(n), where n is the number of nodes in the graph

function allPathsSourceTarget(graph: number[][]): number[][] {
	const n = graph.length;
	const ans: number[][] = [];
	function dfs(node: number, path: number[]): void {
		if (node === n - 1) {
			path.push(node);
			ans.push([...path]);
			path.pop();
			return;
		}

		path.push(node);
		for (const nei of graph[node]) {
			dfs(nei, path);
		}
		path.pop();
	}

	dfs(0, []);
	return ans;
}
