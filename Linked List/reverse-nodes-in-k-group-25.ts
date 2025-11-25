// https://leetcode.com/problems/reverse-nodes-in-k-group/

// TL;DR:
// Use a dummy node to handle edge cases for null head or reversed head
// Keep track of a pointer to the last node of the previous group (starting from the dummy node)
// For each group, find the kth node (starting from the groupPrev pointer)
//   - If the kth node is null, break the loop (reached the end)
//   - Otherwise, store the next node after the kth node and reverse the current [groupPrev.next, kthNode] nodes
//      - Trick here is to start prev from the nextAfterKth node so that when reversing is done, first element in the current group will point to the first element in the next group
//   - After reversing, update groupPrev to the next groupPrev node (reversed) and groupPrev.next to the current kth node

// Complexities:
// Time => O(n), where n is the number of nodes in the list
// Space => O(1), in-place solution

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
	const dummy = new ListNode(0, head);
	let groupPrev = dummy;
	while (true) {
		const kthNode = getKthNode(groupPrev, k);
		if (!kthNode) {
			break;
		}

		const nextAfterKth = kthNode.next;

		let prev = nextAfterKth;
		let curr = groupPrev.next;
		while (curr !== nextAfterKth) {
			const next = curr!.next;
			curr!.next = prev;
			prev = curr;
			curr = next;
		}

		const next = groupPrev.next;
		groupPrev.next = kthNode;
		groupPrev = next!;
	}

	return dummy.next;
}

function getKthNode(start: ListNode | null, k: number): ListNode | null {
	while (start && k > 0) {
		start = start.next;
		k--;
	}
	return start;
}
