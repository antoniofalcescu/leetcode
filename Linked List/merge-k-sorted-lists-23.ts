// https://leetcode.com/problems/merge-k-sorted-lists/

// TL;DR:
// Use a merge sort approach to merge the lists two by two
// Iterate through the lists and merge them in pairs using Merge Two Sorted Lists (21) approach
// After merging all pairs, the lists array will have only one list left
// Return the last merged list

// Complexities:
// Time => O(n * log(k)), where n is the number of nodes in the lists and k is the number of lists
// Space => O(k), where k is the number of lists

function mergeTwoLists(
	l1: ListNode | null,
	l2: ListNode | null
): ListNode | null {
	const dummy = new ListNode();
	let curr = dummy;
	while (l1 && l2) {
		if (l1.val < l2.val) {
			curr.next = l1;
			l1 = l1.next;
		} else {
			curr.next = l2;
			l2 = l2.next;
		}

		curr = curr.next;
	}
	while (l1) {
		curr.next = l1;
		curr = curr.next;
		l1 = l1.next;
	}
	while (l2) {
		curr.next = l2;
		curr = curr.next;
		l2 = l2.next;
	}
	return dummy.next;
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
	if (!lists || !lists.length) {
		return null;
	}

	while (lists.length > 1) {
		const mergedLists: (ListNode | null)[] = [];
		for (let i = 0; i < lists.length; i += 2) {
			const l1 = lists[i];
			const l2 = i + 1 < lists.length ? lists[i + 1] : null;
			mergedLists.push(mergeTwoLists(l1, l2));
		}
		lists = mergedLists;
	}

	return lists[0];
}
