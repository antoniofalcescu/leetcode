// https://leetcode.com/problems/binary-tree-inorder-traversal/

// TL;DR:
// Recursive approach:
// - Create the ans array and a helper recursive method in which we call the nodes in the inorder way:
//   - Go to the left child
//   - Append the current val
//   - Go to the right child

// Iterative approach:
// - Create a stack and a current node pointer
// - While the current node is not null or the stack is not empty:
//   - Push the current node to the stack and set the current node to the left child
//   - Pop the top node from the stack and append the value to the ans array and set the current node to the right child to repeat the loop for the right child

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the call stack and output array
function inorderTraversal(root: TreeNode | null): number[] {
	const ansRecursive: number[] = [];
	function dfs(node: TreeNode | null): void {
		if (!node) {
			return;
		}

		dfs(node.left);
		ansRecursive.push(node.val);
		dfs(node.right);
	}
	dfs(root);

	const stack: TreeNode[] = [];
	let curr = root;
	const ansIterative: number[] = [];
	while (curr || stack.length) {
		while (curr) {
			stack.push(curr);
			curr = curr.left;
		}

		curr = stack.pop()!;
		ansIterative.push(curr.val);

		curr = curr.right;
	}

	return ansRecursive;
}
