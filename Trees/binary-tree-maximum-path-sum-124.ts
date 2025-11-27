// https://leetcode.com/problems/binary-tree-maximum-path-sum/

// Hint:
// - Trick is that a path must not include the same node twice (when you visualize it), therefore the DFS must consider two cases:
//   - The path includes the current node and goes through BOTH left and right subtrees (this is the node we use to split)
//   - The path includes the current node and goes through ONLY ONE of the left or right subtrees (this is the node we use to continue the path)

// TL;DR:
// Use a DFS approach
// For each node calculate the left and right subtree sums
// Update the global maxSum variable as if this node is the split root node
// The DFS returns the sum of the current node where we continue the path (either left or right)

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(h), where h is the height of the tree

function maxPathSum(root: TreeNode | null): number {
	let maxSum = -Infinity;

	function dfs(node: TreeNode | null): number {
		if (!node) {
			return 0;
		}

		const leftSum = Math.max(dfs(node.left), 0);
		const rightSum = Math.max(dfs(node.right), 0);

		maxSum = Math.max(maxSum, node.val + leftSum + rightSum);

		return node.val + Math.max(leftSum, rightSum);
	}
	dfs(root);
	return maxSum;
}
