// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

// TL;DR:
// Use a recursive approach to check for each node:
//   - If the current node is greater than max(p, q), we need to search in the left subtree
//   - If the current node is less than min(p, q), we need to search in the right subtree
//   - Otherwise, the current node is the lowest common ancestor

// Complexities:
// Time => O(log(n)), where n is the number of nodes in the tree
// Space => O(h), where h is the height of the tree

function lowestCommonAncestor(
	root: TreeNode | null,
	p: TreeNode | null,
	q: TreeNode | null
): TreeNode | null {
	if (!root || !p || !q) {
		return null;
	}

	const small = p.val < q.val ? p : q;
	const big = p.val > q.val ? p : q;
	if (small.val <= root.val && big.val >= root.val) {
		return root;
	} else if (small.val > root.val) {
		return lowestCommonAncestor(root.right, p, q);
	} else if (big.val < root.val) {
		return lowestCommonAncestor(root.left, p, q);
	}

	return null;
}
