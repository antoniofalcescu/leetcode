// https://leetcode.com/problems/design-circular-queue/

// TL;DR:
// Initialize the following variables:
//   - queue: a circular array to store the queue elements
//   - limit: the maximum number of elements in the queue
//   - size: the number of elements in the queue
//   - front: the index of the front element of the queue
//   - rear: the index of the rear element of the queue
// enQueue:
//   - If the queue is full, return false
//   - Increment the size variable
//   - Circularly increment the rear index
//   - Add the value to the queue at the rear index
//   - Return true
// deQueue:
//   - If the queue is empty, return false
//   - Decrement the size variable
//   - Circularly increment the front index (no need to actually delete it as it will get overwritten in a future enQueue)
//   - Return true
// Front:
//   - return queue[front] or -1;
// Rear:
//   - return queue[rear] or -1;
// isEmpty:
//   - return size === 0;
// isFull:
//   - return size === limit;

// Complexities:
// Time => O(1), as we are only performing constant time operations
// Space => O(k), where k is the maximum number of elements in the queue

class MyCircularQueue {
	private readonly queue: number[];
	private readonly limit: number;
	private size: number;
	private front: number;
	private rear: number;

	constructor(k: number) {
		this.queue = Array.from({ length: k });
		this.limit = k;
		this.size = 0;
		this.front = 0;
		this.rear = -1;
	}

	enQueue(value: number): boolean {
		if (this.isFull()) {
			return false;
		}

		this.size++;
		this.rear = (this.rear + 1) % this.limit;
		this.queue[this.rear] = value;

		return true;
	}

	deQueue(): boolean {
		if (this.isEmpty()) {
			return false;
		}

		this.size--;
		this.front = (this.front + 1) % this.limit;

		return true;
	}

	Front(): number {
		return this.isEmpty() ? -1 : this.queue[this.front];
	}

	Rear(): number {
		return this.isEmpty() ? -1 : this.queue[this.rear];
	}

	isEmpty(): boolean {
		return this.size === 0;
	}

	isFull(): boolean {
		return this.size === this.limit;
	}
}
