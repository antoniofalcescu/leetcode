// https://leetcode.com/problems/count-good-nodes-in-binary-tree/

// TL;DR:
// Use a DFS approach
// For each node, if its value is >= max found so far (top-bottom), we increment the answer
// Then, we call the DFS for the left and right children with the new max value (max(max, current node's value))
// We return the answer after the DFS call

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the number of nodes in the tree

function goodNodes(root: TreeNode | null): number {
	let ans = 0;

	function dfs(node: TreeNode | null, max: number): void {
		if (!node) {
			return;
		}

		if (node.val >= max) {
			ans++;
		}

		dfs(node.left, Math.max(max, node.val));
		dfs(node.right, Math.max(max, node.val));
	}

	dfs(root, -Infinity);
	return ans;
}
