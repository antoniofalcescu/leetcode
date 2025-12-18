// https://leetcode.com/problems/binary-tree-postorder-traversal/

// Hint:
// -For the iterative solution, draw a tree and think when can we add a node to the ans array

// TL;DR:
// Recursive approach:
// - Create the ans array and a helper recursive method in which we call the nodes in the postorder way:
//   - Go to the left child
//   - Go to the right child
//   - Append the current val
// Iterative approach:
// - Create a stack with the root node and a visited flag
// - While the stack is not empty:
//   - Pop the top node from the stack and the visited flag
//   - If the node is not null:
//     - If the visited flag is true, append the value to the ans array (means we come back to the node after visiting both children)
//     - Otherwise, push the right child to the stack and the visited flag to the stack and push the left child to the stack and the visited flag to the stack

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(h), where h is the height of the tree

function postorderTraversal(root: TreeNode | null): number[] {
	const ansRecursive: number[] = [];
	function dfs(node: TreeNode | null): void {
		if (!node) {
			return;
		}

		dfs(node.left);
		dfs(node.right);
		ansRecursive.push(node.val);
	}
	dfs(root);

	const ansIterative: number[] = [];
	const stack: [TreeNode | null, boolean][] = [[root, false]];
	while (stack.length) {
		const [curr, visited] = stack.pop()!;
		if (!curr) {
			continue;
		}

		if (visited) {
			ansIterative.push(curr.val);
		} else {
			stack.push([curr, true]);
			stack.push([curr.right, false]);
			stack.push([curr.left, false]);
		}
	}

	return ansIterative;
}
