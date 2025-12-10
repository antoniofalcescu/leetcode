// https://leetcode.com/problems/simplify-path/

// TL;DR:
// Use a stack to store the simplified path (because of the '..' element)
// Split the path by '/' and iterate through the list of elements
//   - If the current element is "..", pop the last element from the stack if it exists
//   - If the current element is not empty (double '/' in the original path) or ".", push it to the stack
// Return the concatenation of '/' and the stack joined by '/'

// Complexities:
// Time => O(n), where n is the length of the input path
// Space => O(n), where n is the length of the input path

function simplifyPath(path: string): string {
	const stack: string[] = [];
	const list = path.split("/");

	for (const elem of list) {
		if (elem === "..") {
			if (stack.length) {
				stack.pop();
			}
		} else if (elem !== "" && elem !== ".") {
			stack.push(elem);
		}
	}

	return "/" + stack.join("/");
}
