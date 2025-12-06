// https://leetcode.com/problems/asteroid-collision/

// Hint:
// Try to visualize an array and how would you brute force it

// TL;DR:
// Use a stack to simulate asteroids colliding
// Iterate through the asteroids array and:
//   - If the asteroid is positive, push it to the stack
//   - If the asteroid is negative:
//     - Pop the stack while the top of the stack is positive and less than the absolute value of the current asteroid
//     - After, the while loop:
//       - If the top of the stack is equal to the absolute value of the current asteroid, pop the stack and and skip adding the current asteroid
//       - If we have an empty stack or the top of the stack is also negative, pusht he current asteroid to the stack
// Return the stack

function asteroidCollision(asteroids: number[]): number[] {
	const stack: number[] = [];
	for (const asteroid of asteroids) {
		const size = Math.abs(asteroid);
		if (asteroid > 0) {
			stack.push(asteroid);
		} else {
			while (
				stack.length &&
				stack[stack.length - 1] > 0 &&
				stack[stack.length - 1] < size
			) {
				stack.pop();
			}
			if (
				stack.length &&
				stack[stack.length - 1] > 0 &&
				stack[stack.length - 1] === size
			) {
				stack.pop();
				continue;
			}

			if (stack.length === 0 || stack[stack.length - 1] < 0) {
				stack.push(asteroid);
			}
		}
	}

	return stack;
}
