// https://leetcode.com/problems/lru-cache/

// TL;DR:
// Define and use a double linked list to store the key-value pairs
// Use a map with key, node pairds for the O(1) operations
// Use a dummy head and tail pointer where the head.next will be the LRU and tail.prev will be the MRU
// Define 2 utils remove/append methods where:
//   - remove: removes the node from the list by updating the next pointer of the previous node and the previous pointer of the next node
//   - append: appends a node to the right of the list
// In the get method:
//   - If the key is in the map, remove the node from the list, append it to the right (MRU) and return the value of the node
//   - If the key is not in the map, return -1
// In the put method:
//   - If the key is in the map, remove the node from the list
//   - Append the new node to the right (MRU) and update the value of the node in the map
//   - After appending, if the size of the map is greater than the capacity, remove the LRU node from the list and the map (by calling remove on the head.next node)

// Complexities:
// Time => O(1), for get and put operations
// Space => O(n), where n is the number of key-value pairs in the cache

class DoubleNode {
	key: number;
	val: number;
	next: DoubleNode | null;
	prev: DoubleNode | null;

	constructor(
		key?: number,
		val?: number,
		next?: DoubleNode | null,
		prev?: DoubleNode | null
	) {
		this.key = key ?? 0;
		this.val = val ?? 0;
		this.next = next ?? null;
		this.prev = prev ?? null;
	}
}

class LRUCache {
	private capacity: number;

	private head: DoubleNode;

	private tail: DoubleNode;

	private map: Map<number, DoubleNode>;

	constructor(capacity: number) {
		this.capacity = capacity;
		this.map = new Map();
		this.head = new DoubleNode();
		this.tail = new DoubleNode();
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}

	remove(node: DoubleNode) {
		const prev = node.prev;
		const next = node.next;

		prev!.next = next;
		next!.prev = prev;
	}

	append(node: DoubleNode) {
		const prev = this.tail.prev;
		const next = this.tail;

		prev!.next = node;
		next!.prev = node;
		node.prev = prev;
		node.next = next;
	}

	get(key: number): number {
		if (this.map.has(key)) {
			const node = this.map.get(key);
			this.remove(node!);
			this.append(node!);

			return node!.val;
		}

		return -1;
	}

	put(key: number, value: number): void {
		if (this.map.has(key)) {
			const node = this.map.get(key);
			this.remove(node!);
		}

		const insertNode = new DoubleNode(key, value);
		this.map.set(key, insertNode);
		this.append(insertNode);

		if (this.map.size > this.capacity) {
			const removeNode = this.head.next;
			this.remove(removeNode!);
			this.map.delete(removeNode!.key);
		}
	}
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
