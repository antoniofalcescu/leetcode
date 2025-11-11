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

	const [small, big] = [Math.min(p.val, q.val), Math.max(p.val, q.val)];
	if (root.val > big) {
		return lowestCommonAncestor(root.left, p, q);
	} else if (root.val < small) {
		return lowestCommonAncestor(root.right, p, q);
	} else {
		return root;
	}
}

class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}
