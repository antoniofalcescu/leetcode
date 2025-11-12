// https://leetcode.com/problems/validate-binary-search-tree/

// TL;DR:
// Use a BFS approach to traverse the tree level by level
// For each node, we also keep track of the min and max values allowed for the current node
// If the current node's value is greater than or equal to the max value or less than or equal to the min value, we return false
// We return true if we traverse the entire tree without returning false for any node

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the number of nodes in the tree

function isValidBST(root: TreeNode | null): boolean {
	if (!root) {
		return true;
	}

	const queue = [root];
	const rangeQueue: number[][] = [[-Infinity, Infinity]];
	while (queue.length) {
		const top = queue.shift()!;
		const [min, max] = rangeQueue.shift()!;

		if (top.val >= max || top.val <= min) {
			return false;
		}

		if (top.left) {
			queue.push(top.left);
			rangeQueue.push([min, top.val]);
		}

		if (top.right) {
			queue.push(top.right);
			rangeQueue.push([top.val, max]);
		}
	}

	return true;
}
