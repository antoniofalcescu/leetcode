// https://leetcode.com/problems/delete-node-in-a-bst/

// TL;DR:
// Recursive approach where we want to:
// - Find the node via basic BST traversal
// - Replace its value with the min value from the right subtree
// - Recursively delete the duplicate value from the right subtree
//    - Base case: if the root is null, return null
//    - If the value is greater than the root, go right, otherwise go left
//    - When we find the node equal to the searching value, check its children:
//      - If it has no children, return null
//      - If it has one child, return the child
//      - If it has two children, find the min value from the right subtree and replace the value of the current node with it
//      - Recursively delete the duplicate value from the right subtree
// Remember for each recursive call to always return the deleteNode returned value to keep the BST connected

// Complexities:
// Time => O(h), where h is the height of the tree
// Space => O(h), where h is the height of the tree

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
	if (!root) {
		return null;
	}

	if (root.val > key) {
		root.left = deleteNode(root.left, key);
	} else if (root.val < key) {
		root.right = deleteNode(root.right, key);
	} else {
		if (!root.left) {
			return root.right;
		}
		if (!root.right) {
			return root.left;
		}

		let curr = root.right;
		while (curr.left) {
			curr = curr.left;
		}
		root.val = curr.val;
		root.right = deleteNode(root.right, root.val);
	}

	return root;
}
