// https://leetcode.com/problems/baseball-game/q

// Hint:
// - Think of what data structure allows for efficient management of previous elements

// TL;DR:
// Use a stack to keep track of recorded scores
// Iterate through the input string and do the operation as described in the requirements

// Complexities:
// Time => O(n), where n is the length of the array
// Space => O(n), where n is the length of the array

function calPoints(operations: string[]): number {
	const stack: number[] = [];
	for (const op of operations) {
		if (op === "+") {
			const [first, second] = [
				stack[stack.length - 1],
				stack[stack.length - 2],
			];
			stack.push(first + second);
		} else if (op === "D") {
			const first = stack[stack.length - 1];
			stack.push(first * 2);
		} else if (op === "C") {
			stack.pop();
		} else {
			stack.push(Number(op));
		}
	}

	return stack.reduce((acc, num) => acc + num, 0);
}
