// https://leetcode.com/problems/reverse-linked-list-ii/

// Hint:
// - Think on how to find the sublist that needs to be reverse and how to connect it to the original list

// TL;DR:
// Use a dummy node to handle the edge case of reversing the first node
// Split the problem into 3 parts:
// 1. Find the left and right nodes and the node before the left node
// 2. Reverse the nodes between the left and right nodes
// 3. Connect the reversed nodes to the original list (first.next = rightNode)

// Complexities:
// Time => O(n), where n is the length of the list
// Space => O(1)

function reverseBetween(
	head: ListNode | null,
	left: number,
	right: number
): ListNode | null {
	const dummy = new ListNode(-1, head);
	let leftNode = dummy;
	let rightNode = dummy;
	let first = dummy;
	while (left > 0) {
		leftNode = leftNode.next!;
		if (left > 1) {
			first = first.next!;
		}
		left--;
	}
	while (right > 0) {
		rightNode = rightNode.next!;
		right--;
	}
	first.next = rightNode;

	let prev = rightNode.next;
	let curr = leftNode;
	while (prev !== rightNode) {
		const next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next!;
	}

	return dummy.next;
}
