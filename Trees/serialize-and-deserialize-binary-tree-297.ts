// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/

// Hint:
// - Can use BFS traversal for both serialization and deserialization
//    - serialize -> straightforward BFS starting from root
//    - deserialize -> similar BFS, but also keep track of an index to iterate through the serialized data

// TL;DR:
// Use BFS traversal for both serialization and deserialization
// Serialize:
//   - Push the root node to the queue
//   - Then, each time we have elements in the queue, pop each of them and process nodes by:
//     - Adding their value to the answer array
//     - Adding their left and right children to the queue (if they are not null)
// Deserialize:
//   - Split the serialized data into a list of values
//   - Create the root node with the first value and push it to the queue
//   - Then, each time we have elements in the queue, pop each of them and process nodes by:
//     - If the current value is "N", set the current child to null
//     - Otherwise, create a new node with the current value and push it to the queue

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the number of nodes in the tree

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
	const ans: (number | "N")[] = [];
	const queue = new Queue<TreeNode | null>();
	queue.push(root);
	while (!queue.isEmpty()) {
		const top = queue.pop();
		if (!top) {
			ans.push("N");
		} else {
			ans.push(top.val);
			queue.push(top.left);
			queue.push(top.right);
		}
	}

	return ans.join(",");
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
	const list = data.split(",");
	if (list[0] === "N") {
		return null;
	}

	const root = new TreeNode(Number(list[0]));
	const queue = new Queue<TreeNode>();
	queue.push(root);
	let index = 1;
	while (!queue.isEmpty()) {
		const parent = queue.pop()!;
		const leftValue = list[index++];
		if (leftValue === "N") {
			parent.left = null;
		} else {
			const leftNode = new TreeNode(Number(leftValue));
			parent.left = leftNode;
			queue.push(leftNode);
		}

		const rightValue = list[index++];
		if (rightValue === "N") {
			parent.right = null;
		} else {
			const rightNode = new TreeNode(Number(rightValue));
			parent.right = rightNode;
			queue.push(rightNode);
		}
	}
	return root;
}
