// https://leetcode.com/problems/house-robber-iii/

// TL;DR:
// Use a DFS Postorder approach where, for each node, we keep track of the max rob value with and without the current node:
//   - Base case: if the node is null, return [0, 0]
//   - Recursive case:
//     - Traverse the left and right subtrees and get their with/withoout values
//     - Calculate withRoot value = current node's value + both subtrees without values
//     - Calculate withoutRoot value = max(left with/without) + max(right with/without)
//   - Return the with/without values for the current node
// Call the DFS method and return the max of the with/without root values

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the number of nodes in the tree (recursion stack)

function dfs(node: TreeNode | null): [number, number] {
	if (!node) {
		return [0, 0];
	}

	const [leftWith, leftWithout] = dfs(node.left);
	const [rightWith, rightWithout] = dfs(node.right);

	const withRoot = node.val + leftWithout + rightWithout;
	const withoutRoot =
		Math.max(leftWith, leftWithout) + Math.max(rightWith, rightWithout);

	return [withRoot, withoutRoot];
}

function rob(root: TreeNode | null): number {
	const [withRoot, withoutRoot] = dfs(root);
	return Math.max(withRoot, withoutRoot);
}
