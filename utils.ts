class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

class _Node {
	val: number;
	next: _Node | null;
	random: _Node | null;
	constructor(val?: number, next?: _Node, random?: _Node) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
		this.random = random === undefined ? null : random;
	}
}

class Queue<T> {
	private items: T[] = [];

	push(item: T) {
		this.items.push(item);
	}

	pop() {
		return this.items.shift();
	}

	isEmpty() {
		return this.items.length === 0;
	}

	size() {
		return this.items.length;
	}

	front() {
		return this.items[0];
	}
}

class AdjacencyListNode {
	val: number;
	neighbors: AdjacencyListNode[];
	constructor(val?: number, neighbors?: AdjacencyListNode[]) {
		this.val = val === undefined ? 0 : val;
		this.neighbors = neighbors === undefined ? [] : neighbors;
	}
}
