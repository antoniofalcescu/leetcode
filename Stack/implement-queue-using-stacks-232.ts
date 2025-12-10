// https://leetcode.com/problems/implement-queue-using-stacks/

// Hint:
// - Separate the push operation from the pop operation in terms of stacks

// TL;DR:
// Use 2 stacks (inStack and outStack) to implement the queue
// Push:
//   - Push the new element to the inStack
// Pop:
//   - If the outStack is empty, transfer all elements from inStack to outStack
//   - Pop the top element from the outStack
// Peek:
//   - If the outStack is empty, transfer all elements from inStack to outStack
//   - Return the top element from the outStack
// Empty:
//   - Return true if both stacks are empty, false otherwise

// Complexities:
// Time => O(1) for push, O(1) amortized for pop and peek, O(1) for empty
// Space => O(n), where n is the number of elements in the stacks

class MyQueue {
	private readonly inStack: number[];
	private readonly outStack: number[];

	constructor() {
		this.inStack = [];
		this.outStack = [];
	}

	push(x: number): void {
		this.inStack.push(x);
	}

	pop(): number {
		if (!this.outStack.length) {
			while (this.inStack.length) {
				this.outStack.push(this.inStack.pop()!);
			}
		}
		return this.outStack.pop()!;
	}

	peek(): number {
		if (!this.outStack.length) {
			while (this.inStack.length) {
				this.outStack.push(this.inStack.pop()!);
			}
		}
		return this.outStack[this.outStack.length - 1];
	}

	empty(): boolean {
		return this.outStack.length === 0 && this.inStack.length === 0;
	}
}
