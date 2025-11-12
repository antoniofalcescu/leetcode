// https://leetcode.com/problems/kth-smallest-element-in-a-bst/

// TL;DR:
// Use an iterative DFS approach to traverse the tree in inorder manner (left, root, right)
// Keep track of the count of nodes visited
// Iterative Inorder DFS works like this:
//   - While the current node is not null, push the current node to the stack and move to the left child
//   - After reaching a null node, pop the last node from the stack and process it
//   - Move to the right child of the popped/processed node
//   - This resets the big while loop and we continue the process with the new current node
// If the count is equal to k, return the value of the current node

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(h), where h is the height of the tree

// Iterative DFS
function kthSmallest(root: TreeNode | null, k: number): number {
	let count = 0;
	let curr: TreeNode | null = root;
	const stack: TreeNode[] = [];

	while (curr || stack.length) {
		while (curr) {
			stack.push(curr);
			curr = curr.left;
		}

		curr = stack.pop()!;
		count++;
		if (count === k) {
			return curr.val;
		}

		curr = curr.right;
	}

	return -1;
}
