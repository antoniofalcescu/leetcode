// https://leetcode.com/problems/build-an-array-with-stack-operations/

// TL;DR:
// Use a stack to simulate the push and pop operations
// Iterate through the numbers from 1 to n and:
//   - Push the current element to the stack
//   - Push "Push" to the answer array
//   - If the current element is the current one in the target array, increment the target index
//   - Otherwise, pop the stack and push "Pop" to the answer array
// Return the answer array

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function buildArray(target: number[], n: number): string[] {
	const stack: number[] = [];
	let nextElement = 1;
	let targetIdx = 0;
	const ans: string[] = [];
	while (nextElement <= n) {
		if (targetIdx === target.length) {
			break;
		}

		stack.push(nextElement);
		ans.push("Push");
		nextElement++;

		if (stack[stack.length - 1] === target[targetIdx]) {
			targetIdx++;
		} else {
			stack.pop();
			ans.push("Pop");
		}
	}

	return ans;
}
