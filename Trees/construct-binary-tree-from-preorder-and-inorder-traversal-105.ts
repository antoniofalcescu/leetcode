// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

// TL;DR:
// Use a recursive DFS approach to build the tree
// The algorithm works on the following logic:
//   - The first element of the preorder array is always the root of the current subtree
//   - The index of the current element in the inorder array is the separator between the left and right children subtrees
// Initialize a map indices for the inorder array so that we can get the index of the current element in O(1) time
// Run the DFS in a binary search manner by using left and right pointers to split the inorder
//   - Base case is left > right which means we've reached the end of the current subtree
//   - Otherwise, we create the current root TreeNode, increment the preorder array index and use the inorder indices to get the inorder array index
//   - Recursively call the DFS for the left and right subtrees based on the inorder index

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the number of nodes in the tree

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
	let preorderIdx = 0;
	const inorderIndices = {};
	for (let i = 0; i < inorder.length; i++) {
		inorderIndices[inorder[i]] = i;
	}

	function dfs(left, right) {
		if (left > right) {
			return null;
		}

		const rootValue = preorder[preorderIdx++];
		const root = new TreeNode(rootValue);
		root.left = dfs(left, inorderIndices[rootValue] - 1);
		root.right = dfs(inorderIndices[rootValue] + 1, right);

		return root;
	}

	return dfs(0, inorder.length - 1);
}
