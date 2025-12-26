// https://leetcode.com/problems/lfu-cache/

// TL;DR:
// Define a LFUNode class to store a Double Linked List node with key, value, frequency, next and prev pointers
// Define a LFULinkedList class to store a Double Linked List with head, tail and size and methods to add, remove certain nodes and remove the LRU node (rightest node)
// In the LFUCache class:
//   - Store the capacity, min frequency, key to node mapping and frequency to linked list mapping
//   - In the get method:
//     - If the key is not in the map, return -1
//     - Otherwise, update the key's node frequency and return the value
//   - In the put method:
//     - If the key is in the map, update the key's node value and the frequency
//     - Otherwise:
//       - If the cache is at capacity, get the LFU Linked List (with minFreq) and remove its LRU node
//       - Create a new node with the key and value, add it to the key-node map, set the minFreq to 1 and add it to the freq to Linked List map
//   - In the helper updateFreq method:
//     - Remove the node from the current frequency list
//     - If the removed node's frequency was the only node with freq = minFreq, increment minFreq
//     - Increment the node's frequency and add it to the new freq-Linked List pair in the freqToList map

// Complexities:
// Time => O(1) for get and put operations
// Space => O(n), where n is the number of key-value pairs in the cache

class LFUNode {
	key: number;
	val: number;
	freq: number;
	next: LFUNode | null;
	prev: LFUNode | null;

	constructor(key: number, val: number) {
		this.key = key;
		this.val = val;
		this.freq = 1;
		this.next = null;
		this.prev = null;
	}
}

class LFULinkedList {
	head: LFUNode;
	tail: LFUNode;
	size: number;

	constructor() {
		this.head = new LFUNode(-1, -1);
		this.tail = new LFUNode(-1, -1);
		this.head.next = this.tail;
		this.tail.prev = this.head;

		this.size = 0;
	}

	public add(node: LFUNode): void {
		const next = this.head.next!;
		node.prev = this.head;
		node.next = next;
		this.head.next = node;
		next.prev = node;

		this.size++;
	}

	public remove(node: LFUNode): void {
		const prev = node.prev!;
		const next = node.next!;
		prev.next = next;
		next.prev = prev;

		this.size--;
	}

	public removeLRU(): LFUNode {
		const lru = this.tail.prev!;
		this.remove(lru);
		return lru;
	}
}

class LFUCache {
	private readonly capacity: number;
	private minFreq: number;
	private keyToNode: Map<number, LFUNode>;
	private freqToList: Map<number, LFULinkedList>;

	constructor(capacity: number) {
		this.capacity = capacity;
		this.minFreq = 0;
		this.keyToNode = new Map();
		this.freqToList = new Map();
	}

	get(key: number): number {
		if (!this.keyToNode.has(key)) {
			return -1;
		}

		const node = this.keyToNode.get(key)!;
		this.updateFreq(node);

		return node.val;
	}

	put(key: number, value: number): void {
		if (this.keyToNode.has(key)) {
			const node = this.keyToNode.get(key)!;
			node.val = value;
			this.updateFreq(node);
			return;
		}

		if (this.keyToNode.size === this.capacity) {
			const lfuList = this.freqToList.get(this.minFreq)!;
			const lfu = lfuList.removeLRU();
			this.keyToNode.delete(lfu.key);
		}

		const node = new LFUNode(key, value);
		this.keyToNode.set(key, node);

		this.minFreq = 1;
		if (!this.freqToList.has(this.minFreq)) {
			this.freqToList.set(this.minFreq, new LFULinkedList());
		}
		this.freqToList.get(this.minFreq)!.add(node);
	}

	updateFreq(node: LFUNode): void {
		const freq = node.freq;
		const list = this.freqToList.get(freq)!;
		list.remove(node);

		if (freq === this.minFreq && list.size === 0) {
			this.minFreq++;
		}

		node.freq++;
		if (!this.freqToList.has(node.freq)) {
			this.freqToList.set(node.freq, new LFULinkedList());
		}
		this.freqToList.get(node.freq)!.add(node);
	}
}
