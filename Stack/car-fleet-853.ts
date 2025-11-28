// https://leetcode.com/problems/car-fleet/

// Hint:
// - Monotonic increasing stack approach to keep track of the time it takes for each car to reach the target

// TL;DR:
// Use a monotonic strictly increasing stack to keep track of the time it takes for each car to reach the target
// Sort the pair of position and speed in descending order (by position)
// Iterate through the sorted pairs and:
//  - Calculate the time it takes for the current car to reach the target
//  - Push the time to the stack only if the current time is greater than the time of the previous car in the stack
// Return the length of the stack

// Complexities:
// Time => O(n * log(n)), where n is the length of the input arrays
// Space => O(n), where n is the length of the input arrays

function carFleet(target: number, position: number[], speed: number[]): number {
	const pairs = position.map((pos, i) => [pos, speed[i]]);
	pairs.sort((a, b) => b[0] - a[0]);
	const stack: number[] = [];
	for (const [pos, speed] of pairs) {
		const time = (target - pos) / speed;
		if (!stack.length || stack[stack.length - 1] < time) {
			stack.push(time);
		}
	}
	return stack.length;
}
