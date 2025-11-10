// https://leetcode.com/problems/evaluate-reverse-polish-notation/

// TL;DR:
// Use a stack to keep track of the numbers and perform the operations as described in the requirements
// For each token, if it is a number, push it to the stack
// If it is an operator, pop the top two numbers from the stack and perform the operation (based on the operator)
// Push the result back to the stack
// Return the top of the stack

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function evalRPN(tokens: string[]): number {
	const ops: Record<string, (a: number, b: number) => number> = {
		"+": (a, b) => a + b,
		"-": (a, b) => a - b,
		"*": (a, b) => a * b,
		"/": (a, b) => Math.trunc(a / b),
	};
	const stk: number[] = [];
	for (const token of tokens) {
		if (!Object.keys(ops).includes(token)) {
			stk.push(Number(token));
		} else {
			const [num2, num1] = [stk.pop(), stk.pop()] as number[];
			const res = ops[token](num1, num2);
			stk.push(res);
		}
	}

	return stk[0];
}
