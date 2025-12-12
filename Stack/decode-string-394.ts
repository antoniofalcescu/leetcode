// https://leetcode.com/problems/decode-string/

// TL;DR:
// Use 2 stacks, one for the numbers and one for the strings to handle nested encodings
// Keep track of the current number and string with 2 variables
// Iterate through the string char by char:
//   - If the current character is a digit, update the current number
//   - If the current character is a letter, update the current string
//   - If the current character is a '[', push the current number and string to their stacks and reset them
//   - If the current character is a ']', pop the last string and number from the stack and update the current string with the popped string + the current string repeated popped number times
// Return the current string

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(n), where n is the length of the input string

function isDigit(c: string): boolean {
	return !isNaN(Number(c));
}

function decodeString(s: string): string {
	const numStack: number[] = [];
	const strStack: string[] = [];

	let [currNum, currStr] = [0, ""];
	for (const c of s) {
		if (isDigit(c)) {
			currNum = currNum * 10 + Number(c);
		} else if (c === "[") {
			numStack.push(currNum);
			strStack.push(currStr);
			[currNum, currStr] = [0, ""];
		} else if (c === "]") {
			const prevStr = strStack.pop();
			const number = numStack.pop()!;

			currStr = prevStr + currStr.repeat(number);
		} else {
			currStr += c;
		}
	}

	return currStr;
}
