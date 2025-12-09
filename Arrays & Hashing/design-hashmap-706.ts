// https://leetcode.com/problems/design-hashmap/

// Hint:
// - Similar to Design HashSet, think on how to efficiently handle collisions in a trivial linear data structure way

// TL;DR:
// Use an array of fixed size (10^4 = max number of put operations) with linked lists as the elements
// Use a basic module hashing (key % array.length) to decide which index of the array will hold the value
// For put - iterate through the LinkedList of the index and:
//   - If the key already exists, update the value
//   - Otherwise, add a new KeyValNode with the added key and value
// For get - iterate through the LinkedList of the index and:
//   - If the key exists, return the value
//   - Otherwise, return -1
// For remove - iterate through the LinkedList of the index and:
//   - If the key exists, remove the KeyValNode

// Complexities:
// Time => O(n / k), where n is the number of keys and k is the set size (10_000 for this input)
// Space => O(m + k), where m is the number of unique keys and k is the set size (10_000 for this input)

class MyHashMap {
	private readonly map: KeyValNode[];

	constructor() {
		this.map = Array.from(
			{ length: Math.pow(10, 4) + 1 },
			() => new KeyValNode(-1, -1)
		);
	}

	put(key: number, value: number): void {
		const hash = this._hash(key);
		let curr = this.map[hash];
		while (curr.next) {
			if (curr.next.key === key) {
				curr.next.val = value;
				return;
			}
			curr = curr.next;
		}

		curr.next = new KeyValNode(key, value);
	}

	get(key: number): number {
		const hash = this._hash(key);
		let curr = this.map[hash];
		while (curr.next) {
			if (curr.next.key === key) {
				return curr.next.val;
			}
			curr = curr.next;
		}

		return -1;
	}

	remove(key: number): void {
		const hash = this._hash(key);
		let curr = this.map[hash];
		while (curr.next) {
			if (curr.next.key === key) {
				curr.next = curr.next.next;
				return;
			}
			curr = curr.next;
		}
	}

	private _hash(key: number): number {
		return key % this.map.length;
	}
}
