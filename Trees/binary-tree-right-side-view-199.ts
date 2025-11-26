// https://leetcode.com/problems/binary-tree-right-side-view/

// TL;DR:
// Use a BFS approach
// Push the root node to the queue
// Then, each time we have elements in the queue, pop all of them and process non-null nodes by overwriting the rightest value and add their children to the queue (left to right)
// If we found any node in this level, add it to the answer array

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the number of nodes in the tree

function rightSideView(root: TreeNode | null): number[] {
	const ans: number[] = [];
	const queue = new Queue<TreeNode | null>();
	queue.push(root);
	while (!queue.isEmpty()) {
		const qLength = queue.size();
		let rightest: number | undefined;
		for (let i = 0; i < qLength; i++) {
			const top = queue.pop();
			if (top) {
				rightest = top.val;
				queue.push(top.left);
				queue.push(top.right);
			}
		}
		if (rightest !== undefined) {
			ans.push(rightest);
		}
	}
	return ans;
}
