// https://leetcode.com/problems/copy-list-with-random-pointer/

// TL;DR:
// Create a map to store the old nodes and their corresponding new nodes (must have null, null pair to handle edge case where next/random is null)
// Use a two pass approach:
// First pass:
//   - Iterate through the list and create a new copy node for each old node
//   - Store the old nodes and their corresponding new nodes in the map
// Second pass:
//   - Iterate through the list again and set the next and random pointers of the new nodes
// Return the head of the new list (using the map)

// Complexities:
// Time => O(n), where n is the number of nodes in the list
// Space => O(n), where n is the number of nodes in the list

function copyRandomList(head: _Node | null): _Node | null {
	const oldToNew = new Map();
	oldToNew.set(null, null);

	let curr = head;
	while (curr) {
		const copy = new _Node(curr.val);
		oldToNew.set(curr, copy);
		curr = curr.next;
	}

	curr = head;
	while (curr) {
		const copy = oldToNew.get(curr);
		copy.next = oldToNew.get(curr.next);
		copy.random = oldToNew.get(curr.random);
		curr = curr.next;
	}

	return oldToNew.get(head);
}
