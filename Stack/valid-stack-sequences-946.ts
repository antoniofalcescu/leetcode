// https://leetcode.com/problems/validate-stack-sequences/

// Hint:
// - Simulate the stack exactly as mentioned in the operations

// TL;DR:
// Use a stack to simulate the push and pop operations
// Iterate through the pushed array and:
//   - Push the current element to the stack
//   - While the stack is not empty and the top of the stack is equal to the current popped element, pop the stack
// Return true if the popped index is equal to the length of the popped array

// Complexities:
// Time => O(n), where n is the length of the input arrays
// Space => O(n), where n is the length of the input arrays

function validateStackSequences(pushed: number[], popped: number[]): boolean {
	let poppedIdx = 0;
	const stack: number[] = [];

	for (const x of pushed) {
		stack.push(x);

		while (stack.length > 0 && stack[stack.length - 1] === popped[poppedIdx]) {
			stack.pop();
			poppedIdx++;
		}
	}

	return poppedIdx === popped.length;
}
