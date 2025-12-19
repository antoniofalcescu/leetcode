// https://leetcode.com/problems/delete-leaves-with-a-given-value/

// TL;DR:
// Use a recursive DFS Postorder approach:
//   - Base case: if the node is null, return null
//   - Recursive case:
//     - Recursively call removeLeafNodes for the left and right subtrees and assign its results to the left and right children of the current node
//     - If the current node is a leaf and its value is equal to the target, return null
//     - Otherwise, return the current node

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(h), where h is the height of the tree

function isLeaf(node: TreeNode): boolean {
	return !node.left && !node.right;
}

function removeLeafNodes(
	root: TreeNode | null,
	target: number
): TreeNode | null {
	if (!root) {
		return null;
	}

	root.left = removeLeafNodes(root.left, target);
	root.right = removeLeafNodes(root.right, target);

	if (isLeaf(root) && root.val === target) {
		return null;
	}

	return root;
}
