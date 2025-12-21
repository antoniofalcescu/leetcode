// https://leetcode.com/problems/open-the-lock/

// TL;DR:
// Use a BFS approach
//   - Initialize a queue with the starting state
//   - Initialize a visited set with the deadends and the starting state
//   - Keep track of the number of turns
//   - While the queue is not empty:
//     - For each state in the current level:
//       - If the state is the target, return the number of turns
//       - Otherwise, calculate and add the neighbors of the state to the queue:
//         - Increment the digit by 1 and decrement the digit by 1 (wrap around if necessary)
//         - Add the new state to the queue if it's not visited
//     - Increment the number of turns
// Return the number of turns

// Complexities:
// Time => O(d^n + m), where d is the number of digits per wheel, n is the number of wheels and m is the number of deadends
// Space => O(d^n), where d is the number of digits per wheel, n is the number of wheels

function getNeighbors(state: string): string[] {
	const neighbors: string[] = [];
	const digits = state.split("");
	for (let i = 0; i < digits.length; i++) {
		const original = digits[i];
		const incremented = ((Number(digits[i]) + 1) % 10).toString();
		const decremented = ((Number(digits[i]) - 1 + 10) % 10).toString();

		digits[i] = incremented;
		neighbors.push(digits.join(""));

		digits[i] = decremented;
		neighbors.push(digits.join(""));

		digits[i] = original;
	}

	return neighbors;
}

function openLock(deadends: string[], target: string): number {
	const start = "0000";
	if (deadends.includes(start)) {
		return -1;
	}

	const queue = new Queue<string>([start]);
	const visited = new Set<string>([...deadends, start]);
	let turns = 0;

	while (!queue.isEmpty()) {
		const size = queue.size();
		for (let i = 0; i < size; i++) {
			const state = queue.pop();
			if (state === target) {
				return turns;
			}

			for (const neighbor of getNeighbors(state)) {
				if (!visited.has(neighbor)) {
					visited.add(neighbor);
					queue.push(neighbor);
				}
			}
		}
		turns++;
	}

	return -1;
}
