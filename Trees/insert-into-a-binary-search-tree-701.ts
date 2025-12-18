// https://leetcode.com/problems/insert-into-a-binary-search-tree/

// TL;DR:
// Recursive approach:
// - If the root is null, return a new TreeNode with the value
// - If the value is greater than the root's value, insert into the right subtree recursively
// - Otherwise, insert into the left subtree recursively
// Iterative approach:
// - If the root is null, return a new TreeNode with the value
// - Create a current node and traverse the tree until we find a position with a null child and insert the value there (same as in recursive approach)

// Complexities:
// Time => O(h), where h is the height of the tree
// Space => O(h) for recursive call stack, O(1) for iterative

function insertIntoBSTRecursive(
	root: TreeNode | null,
	val: number
): TreeNode | null {
	if (!root) {
		return new TreeNode(val);
	}

	if (val > root.val) {
		root.right = insertIntoBSTRecursive(root.right, val);
	} else {
		root.left = insertIntoBSTRecursive(root.left, val);
	}

	return root;
}

function insertIntoBSTIterative(
	root: TreeNode | null,
	val: number
): TreeNode | null {
	if (!root) {
		return new TreeNode(val);
	}

	let curr = root;
	while (true) {
		if (val > curr.val) {
			if (!curr.right) {
				curr.right = new TreeNode(val);
				break;
			}
			curr = curr.right;
		} else {
			if (!curr.left) {
				curr.left = new TreeNode(val);
				break;
			}
			curr = curr.left;
		}
	}

	return root;
}
