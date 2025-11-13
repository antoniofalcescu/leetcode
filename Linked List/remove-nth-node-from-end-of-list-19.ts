// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

// TL;DR:
// Create a dummy node before the head
// Use two pointers each starting from the dummy node
// Move the right pointer n steps ahead
// Then, iterate both in parallel until the right pointer reaches the end of the list
// At this point, the left pointer will be at the node before the nth node from the end (this also covers cases where we have only one node or the nth node is the head)
// Remove the nth node from the end of the list

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
	const dummy = new ListNode(0, head);
	let left = dummy;
	let right = dummy;
	for (let i = 0; i <= n; i++) {
		right = right.next!;
	}

	while (right) {
		left = left.next!;
		right = right.next!;
	}

	left.next = left.next!.next;
	return dummy.next;
}
