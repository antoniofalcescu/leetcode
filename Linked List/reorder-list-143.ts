// https://leetcode.com/problems/reorder-list/

// TL;DR:
// First, find the middle of the list using the slow and fast pointer approach
// Then, reverse the second half of the list
// Finally, keeping track of head and tail pointers, move towards the middle of the list and merge the two halves (take into accout odd/even lengths)

// Complexities:
// Time => O(n), where n is the number of nodes in the list
// Space => O(1), in-place solution

function reorderList(head: ListNode | null): void {
	let slow = head;
	let fast = head;
	while (fast && fast.next) {
		slow = slow!.next;
		fast = fast.next.next;
	}

	let mid = slow;
	let prev: ListNode | null = null;
	while (mid) {
		const nxt = mid.next;
		mid.next = prev;
		prev = mid;
		mid = nxt;
	}

	let curr = head!;
	let tail = prev!;
	while (curr !== tail && curr.next !== tail) {
		const nextCurr = curr.next;
		const nextTail = tail.next;

		curr.next = tail;
		tail.next = nextCurr;
		curr = nextCurr!;
		tail = nextTail!;
	}
}
