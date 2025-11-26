// https://leetcode.com/problems/balanced-binary-tree/

// TL;DR:
// Use a recursive DFS approach and keep an isBalanced flag that will be returned at the end
// The DFS will get the height of each subtree and update the isBalanced flag if the difference in height is > 1:

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(h), where h is the height of the tree

function isBalanced(root: TreeNode | null): boolean {
	let isBalanced = true;

	function dfs(node: TreeNode | null): number {
		if (!node) {
			return 0;
		}

		const leftHeight = dfs(node.left);
		const rightHeight = dfs(node.right);
		if (Math.abs(leftHeight - rightHeight) > 1) {
			isBalanced = false;
		}

		return 1 + Math.max(leftHeight, rightHeight);
	}

	dfs(root);
	return isBalanced;
}
