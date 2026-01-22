// https://neetcode.io/problems/largest-bst-subtree/question

// TL;DR:
// Postorder DFS approach with a global maxSize variable:
//   - Keep track of: [isBST, size of the BST, min value of the BST, max value of the BST]
//   - Base case: if the node is null, return [true, 0, Infinity, -Infinity]
//   - Recursive case:
//     - Traverse the left and right subtrees and get their isBST, size, min, max values
//     - Check if the current node is a root of a BST:
//       - The left subtree must be a BST
//       - The right subtree must be a BST
//       - The current node's value must be greater than the left max and less than the right min
//     - If yes:
//       - Update the global maxSize with the size of the current BST (1 + leftSize + rightSize)
//       - Return [true, 1 + leftSize + rightSize, Math.min(leftMin, node.val), Math.max(rightMax, node.val)]
//     - If no:
//       - Update the global maxSize with the max of the left and right sizes
//       - Return [false, 0, Infinity, -Infinity] so the parent knows it can't use this subtree as a BST

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(h), where h is the height of the tree

class LargestBSTSubtreeSolution {
	/**
	 * @param {TreeNode} root
	 * @return {number}
	 */
	largestBSTSubtree(root) {
		let maxSize = 0;

		function dfs(node) {
			if (!node) {
				return [true, 0, Infinity, -Infinity];
			}

			const [leftIsBST, leftSize, leftMin, leftMax] = dfs(node.left);
			const [rightIsBST, rightSize, rightMin, rightMax] = dfs(node.right);

			if (
				leftIsBST &&
				rightIsBST &&
				node.val > leftMax &&
				node.val < rightMin
			) {
				maxSize = Math.max(maxSize, 1 + leftSize + rightSize);
				return [
					true,
					1 + leftSize + rightSize,
					Math.min(leftMin, node.val),
					Math.max(rightMax, node.val),
				];
			}

			maxSize = Math.max(maxSize, leftSize, rightSize);
			return [false, 0, Infinity, -Infinity];
		}

		dfs(root);
		return maxSize;
	}
}
