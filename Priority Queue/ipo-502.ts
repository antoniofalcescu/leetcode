// https://leetcode.com/problems/ipo/

// TL;DR:
// Two Heaps approach to keep track of possible projects we can take based on the minimized capital required and projects we do based on the maximized profit:
//   - Use a min heap to store the projects based on the capital
//   - Use a max heap to store the projects based on the profit
//   - Iterate k times:
//     - While the current capital we have is >= top of the possible min heap projects, pop and add the profit to the doable max heap
//     - If the doable max heap is empty, break the loop (k is larger than the number of projects/reachedd a dead end with the capital)
//     - Add the profit from the doable max heap to the capital

// Complexities:
// Time => O(n * log(n)), where n is the number of projects
// Space => O(n), where n is the number of projects

function findMaximizedCapital(
	k: number,
	w: number,
	profits: number[],
	capital: number[]
): number {
	const possible = new MinPriorityQueue<[number, number]>((elem) => elem[1]);
	for (let i = 0; i < profits.length; i++) {
		possible.enqueue([profits[i], capital[i]]);
	}
	const doable = new MaxPriorityQueue<number>();

	for (let i = 0; i < k; i++) {
		while (!possible.isEmpty() && possible.front()[1] <= w) {
			const [profit, cap] = possible.pop();
			doable.enqueue(profit);
		}

		if (doable.isEmpty()) {
			break;
		}
		w += doable.dequeue();
	}

	return w;
}
