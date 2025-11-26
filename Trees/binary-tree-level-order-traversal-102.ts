// https://leetcode.com/problems/binary-tree-level-order-traversal/

// TL;DR:
// Use a BFS approach
// Push the root node to the queue
// Then, each time we have elements in the queue, pop all of them and process non-null nodes by adding them to the level values and add their children to the queue
// If current level has any nodes, add it to the answer array

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the number of nodes in the tree

function levelOrder(root: TreeNode | null): number[][] {
	const ans: number[][] = [];
	const queue = new Queue<TreeNode | null>();
	queue.push(root);
	while (!queue.isEmpty()) {
		const queueLength = queue.size();
		const level: number[] = [];
		for (let i = 0; i < queueLength; i++) {
			const top = queue.pop();
			if (top) {
				level.push(top!.val);
				queue.push(top.left);
				queue.push(top.right);
			}
		}
		if (level.length) {
			ans.push(level);
		}
	}
	return ans;
}
