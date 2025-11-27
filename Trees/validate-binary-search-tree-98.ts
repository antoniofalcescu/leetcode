// https://leetcode.com/problems/validate-binary-search-tree/

// TL;DR:
// Use a DFS approach
// For each node, if its value is <= min or >= max, we return false
// Then, we call the DFS for the left and right children with the new min and max values (min is current node's value for left, max is current node's value for right)
// Return true if we reached all leafs without returning false

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the number of nodes in the tree

function isValidBST(root: TreeNode | null): boolean {
	function dfs(node: TreeNode | null, min: number, max: number) {
		if (!node) {
			return true;
		}
		if (node.val <= min || node.val >= max) {
			return false;
		}

		return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
	}

	return dfs(root, -Infinity, Infinity);
}
