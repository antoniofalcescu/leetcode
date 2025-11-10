// https://leetcode.com/problems/min-stack/

// TL;DR:
// Use 2 arrays, one for the main stack and one for the minimum values
// The main logic is inside the push method, where we always push to the main stack and check whether to push the new value or the previous min to the min stack
//  - this ensures that each I-th element in the stack will also have a represenative min in the mins array, therefore popping is trivial
// All other operations are trivial and can be done in O(1) time

// Complexities:
// Time => O(1) for all operations
// Space => O(n), where n is the number of elements in the stack

class MinStack {
	private readonly mins: number[];

	private readonly stack: number[];

	constructor() {
		this.mins = [];
		this.stack = [];
	}

	push(val: number): void {
		this.stack.push(val);

		if (this.mins.length) {
			this.mins.push(Math.min(this.mins[this.mins.length - 1], val));
		} else {
			this.mins.push(val);
		}
	}

	pop(): void {
		this.stack.pop();
		this.mins.pop();
	}

	top(): number {
		return this.stack[this.stack.length - 1];
	}

	getMin(): number {
		return this.mins[this.mins.length - 1];
	}
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
