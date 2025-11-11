function levelOrder(root: TreeNode | null): number[][] {
	const ans: number[][] = [];
	const queue: (TreeNode | null)[] = [root];

	while (queue.length) {
		const queueLength = queue.length;
		const level: number[] = [];
		for (let i = 0; i < queueLength; i++) {
			const top = queue.shift();
			if (top) {
				level.push(top.val);
				queue.push(top.left, top.right);
			}
		}

		if (level.length) {
			ans.push(level);
		}
	}

	return ans;
}
