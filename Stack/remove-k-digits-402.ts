// https://leetcode.com/problems/remove-k-digits/

// TL;DR:
// Use a monotonic increasing stack to store the digits of the number with which we greedily remove the greater digits found so far for each digit in the number
// Iterate through the number:
//   - While the stack is not empty and the current digit is smaller than the last digit in the stack, pop the last digit from the stack and decrement k
//   - Push the current digit to the stack
// Remove leftover digits from the stack if k is still greater than 0
// Remove leading zeros from the stack
// Return the string joined from the stack or "0"

// Complexities:
// Time => O(n), where n is the length of the input number
// Space => O(n), where n is the length of the input number

function removeKdigits(num: string, k: number): string {
	const stack: string[] = [];
	for (const c of num) {
		while (stack.length && stack[stack.length - 1] > c && k > 0) {
			stack.pop();
			k--;
		}
		stack.push(c);
	}

	while (stack.length && k > 0) {
		stack.pop();
		k--;
	}

	let i = 0;
	while (i < stack.length && stack[i] === "0") {
		i++;
	}

	const str = stack.slice(i).join("");
	return str || "0";
}
