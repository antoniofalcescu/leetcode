// https://leetcode.com/problems/network-delay-time/

// TL;DR:
// Djikstra's algorithm
// Initialize the adjacency list based on the edges
// Initialize a min heap with the starting node and its weight
// While the priority queue is not empty:
//   - Dequeue the node with the smallest weight
//   - If the node has already been visited, skip it
//   - Otherwise, add the node to the visited set and update the time if the current weight is greater than the current max time
//   - For each neighbor of the current node, add the neighbor and its newly calculated weight to the min heap
// Return the time if all nodes have been visited, otherwise return -1

// Complexities:
// Time => O(e * log(v)), where e is the number of edges and v is the number of vertices
// Space => O(e + v), where e is the number of edges and v is the number of vertices

function networkDelayTime(times: number[][], n: number, k: number): number {
	const adjList = new Map();
	for (let i = 1; i <= n; i++) {
		adjList.set(i, []);
	}

	for (const [source, target, weight] of times) {
		adjList.get(source).push([target, weight]);
	}

	const minHeap = new MinPriorityQueue<number[]>((entry) => entry[1]);
	minHeap.enqueue([k, 0]);
	const visited = new Set<number>();
	let time = 0;

	while (!minHeap.isEmpty()) {
		const [node, weight] = minHeap.dequeue();

		if (visited.has(node)) {
			continue;
		}

		visited.add(node);
		time = Math.max(time, weight);

		for (const [neighbor, neighborWeight] of adjList.get(node)) {
			if (!visited.has(neighbor)) {
				minHeap.enqueue([neighbor, weight + neighborWeight]);
			}
		}
	}

	return visited.size === n ? time : -1;
}

class MyPriorityQueue<T> {
	private heap: T[] = [];
	private compare: (a: T, b: T) => number;

	constructor(initialValues?: T[], compareFn?: (a: T, b: T) => number) {
		this.compare = compareFn ?? ((a, b) => (a as any) - (b as any));

		if (initialValues) {
			this.heap = [...initialValues];
			this.heapify();
		}
	}

	public size(): number {
		return this.heap.length;
	}

	public isEmpty(): boolean {
		return this.heap.length === 0;
	}

	public peek(): T | undefined {
		return this.heap[0];
	}

	public push(value: T): void {
		this.heap.push(value);
		this._heapifyUp(this.heap.length - 1);
	}

	public pop(): T | undefined {
		if (this.isEmpty()) return undefined;

		const root = this.heap[0];
		const last = this.heap.pop()!;

		if (!this.isEmpty()) {
			this.heap[0] = last;
			this._heapifyDown(0);
		}

		return root;
	}

	public heapify(): void {
		for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
			this._heapifyDown(i);
		}
	}

	private _heapifyUp(index: number): void {
		let i = index;

		while (i > 0) {
			const parent = Math.floor((i - 1) / 2);

			if (this.compare(this.heap[i], this.heap[parent]) < 0) {
				this._swap(i, parent);
				i = parent;
			} else break;
		}
	}

	private _heapifyDown(index: number): void {
		let i = index;
		const n = this.heap.length;

		while (true) {
			const left = 2 * i + 1;
			const right = 2 * i + 2;
			let smallest = i;

			if (left < n && this.compare(this.heap[left], this.heap[smallest]) < 0) {
				smallest = left;
			}
			if (
				right < n &&
				this.compare(this.heap[right], this.heap[smallest]) < 0
			) {
				smallest = right;
			}

			if (smallest !== i) {
				this._swap(i, smallest);
				i = smallest;
			} else break;
		}
	}

	private _swap(i: number, j: number): void {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}
}
