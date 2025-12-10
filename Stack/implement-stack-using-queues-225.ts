// https://leetcode.com/problems/implement-stack-using-queues/

// Hint:
// - Implement the stack with 2 queues and then optimize to use only 1 queue

// TL;DR:
// Use a queue to implement the stack
// Push:
//   - Push the new element to the queue
//   - For each element in the queue, push it to the back of the queue (except the last one which is the new element)
// Pop:
//   - Pop the top of the queue
// Top:
//   - Return the top of the queue
// Empty:
//   - Return true if the queue is empty, false otherwise

// Complexities:
// Time => O(n) for push, O(1) for pop, O(1) for top, O(1) for empty
// Space => O(n), where n is the number of elements in the stack

class MyStack {
	private readonly mainQ: Queue<number>;

	constructor() {
		this.mainQ = new Queue();
	}

	push(x: number): void {
		this.mainQ.push(x);
		for (let i = 0; i < this.mainQ.size() - 1; i++) {
			this.mainQ.push(this.mainQ.pop()!);
		}
	}

	pop(): number {
		return this.mainQ.pop()!;
	}

	top(): number {
		return this.mainQ.front();
	}

	empty(): boolean {
		return this.mainQ.isEmpty();
	}
}
