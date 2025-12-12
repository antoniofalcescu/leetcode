// https://leetcode.com/problems/binary-tree-preorder-traversal/

// TL;DR:
// Recursive approach:
// - Create the ans array and a helper recursive method in which we call the nodes in the preorder way:
//   - Append the current val
//   - Go to the left child
//   - Go to the right child
// Iterative approach:
// - Create a stack with the root node
// - While the stack is not empty:
//   - Pop the top node from the stack
//   - If the node is not null:
//     - Append the value to the ans array
//     - Push the right child to the stack
//     - Push the left child to the stack

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the call stack and output array

function preorderTraversal(root: TreeNode | null): number[] {
	const ansRecursive: number[] = [];
	function dfs(node: TreeNode | null): void {
		if (!node) {
			return;
		}

		ansRecursive.push(node.val);
		dfs(node.left);
		dfs(node.right);
	}
	dfs(root);

	const ansIterative: number[] = [];
	const stack: (TreeNode | null)[] = [root];
	while (stack.length) {
		const node = stack.pop();
		if (node) {
			ansIterative.push(node.val);
			stack.push(node.right);
			stack.push(node.left);
		}
	}

	return ansIterative;
}
