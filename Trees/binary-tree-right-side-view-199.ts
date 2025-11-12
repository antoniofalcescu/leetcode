// https://leetcode.com/problems/binary-tree-right-side-view/

// TL;DR:
// Use a BFS approach to traverse the tree level by level
// For each level, we add the children right to left to in the queue
// Then, inside the queue we'll have the nodes ordered from right to left and we can just take the first one and use a found variable to skip the others
// Add the current found node to the answer array and set found to true

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the number of nodes in the tree

function rightSideView(root: TreeNode | null): number[] {
	const queue = [root];
	const ans: number[] = [];
	while (queue.length) {
		const qLength = queue.length;
		let found = false;
		for (let i = 0; i < qLength; i++) {
			const top = queue.shift();
			if (top) {
				queue.push(top.right, top.left);
				if (!found) {
					ans.push(top.val);
					found = true;
				}
			}
		}
	}

	return ans;
}
