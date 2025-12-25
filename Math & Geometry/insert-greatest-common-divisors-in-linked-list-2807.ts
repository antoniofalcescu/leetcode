// https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/

// TL;DR:
// Use a helper function to calculate the GCD of 2 numbers with iterative Euclid:
//   - While the second number is not 0, a=b and b=a % b (in place swap with old a value)
//   - Return a
// Iterate through the linked list and for each pair of adjacent nodes:
//   - Calculate the GCD of the two nodes values
//   - Create a new node with the GCD value and insert it between the two nodes
// Return the head of the linked list

// Complexities:
// Time => O(n * log(min(a, b))), where n is the number of nodes in the linked list and a and b are 2 arbitrary nodes values
// Space => O(1)

function gcd(a: number, b: number): number {
	while (b !== 0) {
		[a, b] = [b, a % b];
	}

	return a;
}

function insertGreatestCommonDivisors(head: ListNode | null): ListNode | null {
	let curr = head;
	while (curr.next) {
		const next = curr.next;
		const insert = new ListNode(gcd(curr.val, next.val));
		curr.next = insert;
		insert.next = next;
		curr = next;
	}

	return head;
}
