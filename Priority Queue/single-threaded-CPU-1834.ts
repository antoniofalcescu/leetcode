// https://leetcode.com/problems/single-threaded-cpu/

// TL;DR:
// Use 2 Min Heaps approach to handle the possible and available tasks:
//   - Use a min heap to store the tasks based on the enqueue time
//   - Use a min heap to store the tasks based on the processing time (if processing time is the same, based on the index)
// Keep track of the current time and the answer array
// While we still have tasks that need to be processed (either possible or available tasks are still in the heaps)
//   - While we have tasks to process from the possible heap, push all tasks with enqueue time <= current time to the available heap
//   - If the available heap is still empty, means we reached an idle lock, so we can jump directly to the next task by updating the current time to the enqueue time of the next task to process
//   - If the available heap is not empty, pop the front task, add the index to the answer array and increment the current time with the processing time
// Return the answer array

// Complexities:
// Time => O(n * log(n)), where n is the number of tasks
// Space => O(n), where n is the number of tasks

function getOrder(tasks: number[][]): number[] {
	const tasksWithIdx = tasks.map((task, i) => [...task, i]) as [
		number,
		number,
		number
	][];
	const possible = new MinPriorityQueue<[number, number, number]>(
		(elem) => elem[0]
	);
	for (const task of tasksWithIdx) {
		possible.enqueue(task);
	}
	const available = new PriorityQueue<[number, number, number]>((a, b) => {
		if (a[1] === b[1]) {
			return a[2] - b[2];
		}
		return a[1] - b[1];
	});

	let time = possible.front()[0];
	const ans = [];
	while (!possible.isEmpty() || !available.isEmpty()) {
		while (!possible.isEmpty() && possible.front()[0] <= time) {
			const task = possible.dequeue();
			available.enqueue(task);
		}

		if (available.isEmpty()) {
			time = possible.front()[0];
			continue;
		}

		const [_, process, idx] = available.dequeue();
		time += process;
		ans.push(idx);
	}

	return ans;
}
