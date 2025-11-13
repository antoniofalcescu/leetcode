// https://leetcode.com/problems/add-two-numbers/

// TL;DR:
// Create a dummy node with a current pointer starting from it
// First iteration:
//   - Goes in parallel through both lists and calculates the sum from the nodes values and the leftover
//   - Updates the leftover and creates a new node with the sum % 10
//   - Moves the pointers forward
// Second/Third iterations:
//   - Goes through the remaining nodes of the first/second lists and calculates the sum from the nodes values and the leftover
//   - Updates the leftover and creates a new node with the sum % 10
//   - Moves the pointer forward
// Finally, check if there is a leftover and, if yes, create a new node with the leftover value
// Return the dummy.next node (the head of the new list)

// Complexities:
// Time => O(max(n, m)), where n and m are the number of nodes in the first and second lists respectively
// Space => O(n), where n is the number of nodes in the new list

function addTwoNumbers(
	l1: ListNode | null,
	l2: ListNode | null
): ListNode | null {
	let lo = 0;
	const dummy = new ListNode();
	let curr = dummy;
	while (l1 && l2) {
		const sum = l1.val + l2.val + lo;
		lo = Math.floor(sum / 10);
		curr.next = new ListNode(sum % 10);
		l1 = l1.next;
		l2 = l2.next;
		curr = curr.next;
	}

	while (l1) {
		const sum = l1.val + lo;
		lo = Math.floor(sum / 10);
		curr.next = new ListNode(sum % 10);

		l1 = l1.next;
		curr = curr.next;
	}

	while (l2) {
		const sum = l2.val + lo;
		lo = Math.floor(sum / 10);
		curr.next = new ListNode(sum % 10);

		l2 = l2.next;
		curr = curr.next;
	}

	if (lo) {
		curr.next = new ListNode(lo);
	}

	return dummy.next;
}
