// https://leetcode.com/problems/single-threaded-cpu/

// TL;DR:
// Create a sorted array of tasks with their indices (sorted based on enqueue time)
// Use a min heap to store the tasks based on the processing time (if processing time is the same, based on the index)
// Keep track of the current processed task index and the time
// While we still have tasks that need to be processed (processed < n or tasks are still in the min heap)
//   - While we have tasks to process from the main tasks array, push all tasks with enqueue time <= current time to the min heap and increment processed
//   - If the heap is still empty, means we reached an idle lock, so we can jump directly to the next task by updating the current time to the enqueue time of the next task to process
//   - If the min heap is not empty, pop the front task, add the index to the answer and increment the current time with the processing time

// Complexities:
// Time => O(n * log(n)), where n is the number of tasks
// Space => O(n), where n is the number of tasks

function getOrder(tasks: number[][]): number[] {
	const n = tasks.length;
	const tasksWithIndex = tasks.map((t, i) => [...t, i]);
	tasksWithIndex.sort((t1, t2) => t1[0] - t2[0]);

	const minHeap = new PriorityQueue<number[]>((t1, t2) => {
		if (t1[1] === t2[1]) {
			return t1[2] - t2[2];
		}

		return t1[1] - t2[1];
	});

	let processed = 0;
	let time = tasksWithIndex[processed][0];
	const ans = [];
	while (processed < n || !minHeap.isEmpty()) {
		while (processed < n && time >= tasksWithIndex[processed][0]) {
			minHeap.enqueue(tasksWithIndex[processed]);
			processed++;
		}

		if (minHeap.isEmpty()) {
			time = tasksWithIndex[processed][0];
			continue;
		}

		const [enqueue, processing, idx] = minHeap.dequeue();
		ans.push(idx);
		time += processing;
	}

	return ans;
}
