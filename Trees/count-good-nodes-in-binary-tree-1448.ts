// https://leetcode.com/problems/count-good-nodes-in-binary-tree/

// TL;DR:
// Use a BFS approach to traverse the tree level by level
// For each node, we also keep track of the max value found so far in the tree from root downwards per level
// If the current node's value is greater than or equal to the max value found so far, we increment the answer
// We return the answer

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the number of nodes in the tree

function goodNodes(root: TreeNode | null): number {
	if (!root) {
		return 0;
	}

	const queue = [root];
	const maxQueue: number[] = [root.val];
	let ans = 0;

	while (queue.length) {
		const top = queue.shift();
		const max = maxQueue.shift() as number;

		if (top) {
			if (top.left) {
				queue.push(top.left);
				const maxLeft = Math.max(max, top.left.val);
				maxQueue.push(maxLeft);
			}

			if (top.right) {
				queue.push(top.right);
				const maxRight = Math.max(max, top.right.val);
				maxQueue.push(maxRight);
			}

			if (top.val >= max) {
				ans++;
			}
		}
	}

	return ans;
}
