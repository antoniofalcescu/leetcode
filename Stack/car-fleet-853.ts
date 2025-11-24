// https://leetcode.com/problems/car-fleet/

// TL;DR:
// Use a monotonic increasing stack to keep track of the time it takes for each car to reach the target
// Sort the pair of position and speed in descending order (by position)
// Iterate through the sorted pairs and:
//  - Calculate the time it takes for the current car to reach the target
//  - Push the time to the stack
//  - If the current time is <= the time of the previous car in the stack, pop the stack (they will form a fleet)
// Return the length of the stack

// Complexities:
// Time => O(n * log(n)), where n is the length of the input arrays
// Space => O(n), where n is the length of the input arrays

function carFleet(target: number, position: number[], speed: number[]): number {
	const stack: number[] = [];
	const posSpeedPairs = position.map((pos, i) => [pos, speed[i]]);
	posSpeedPairs.sort((a, b) => b[0] - a[0]);
	for (const [pos, speed] of posSpeedPairs) {
		const time = (target - pos) / speed;
		stack.push(time);
		const stkLength = stack.length;
		if (stkLength > 1 && stack[stkLength - 1] <= stack[stkLength - 2]) {
			stack.pop();
		}
	}

	return stack.length;
}
