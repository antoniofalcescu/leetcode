// https://leetcode.com/problems/design-hashset/

// TL;DR:
// Use an array with linked lists as the elements
// Use a basic module hashing to decide which index of the array will hold the value
// For add - iterate through the LinkedList of the index and at the end add a new ListNode with the added key
// For remove - iterate through the LinkedList of the index and when finding the value remove the ListNode
// For contains - iterate through the LinkedList of the index and when finding the value return True

// Complexities:
// Time => O(n / k), where n is the number of keys and k is the set size (10_000 for this input)
// Space => O(m + k), where m is the number of unique keys and k is the set size (10_000 for this input)

class MyHashSet {
	private readonly set: ListNode[];

	constructor() {
		this.set = Array.from(
			{ length: Math.pow(10, 4) + 1 },
			() => new ListNode(-1)
		);
	}

	private _hash(key: number): number {
		return key % this.set.length;
	}

	add(key: number): void {
		const hash = this._hash(key);
		let curr = this.set[hash];
		while (curr.next) {
			if (curr.next.val === key) {
				return;
			}
			curr = curr.next;
		}
		curr.next = new ListNode(key);
	}

	remove(key: number): void {
		const hash = this._hash(key);
		let curr = this.set[hash];
		while (curr.next) {
			if (curr.next.val === key) {
				curr.next = curr.next.next;
				return;
			}
			curr = curr.next;
		}
	}

	contains(key: number): boolean {
		const hash = this._hash(key);
		let curr = this.set[hash];
		while (curr.next) {
			if (curr.next.val === key) {
				return true;
			}
			curr = curr.next;
		}
		return false;
	}
}
