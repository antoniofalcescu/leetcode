// https://leetcode.com/problems/task-scheduler/

// TL;DR:
// Use a max heap to store the current frequency of each task and another queue to recycle the tasks that are waiting to be executed
// Use a time variable to keep track of the current time
// Create the frequency map and populate the max heap with it:
// While the max heap is not empty and the queue is not empty:
//   - Increment the time variable
//   - If the max heap is not empty, pop the task with the highest frequency and put it in the queue with decremented freq and the next execution time (if freq > 1)
//   - If the queue is not empty, check if the task at the front of the queue can be put back in the max heap based on time
// Return the time variable

// Complexities:
// Time => O(n * log(26)) = O(n), where n is the number of tasks and 26 is the number of unique tasks
// Space => O(26) = O(1), where 26 is the number of unique tasks

import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

function leastInterval(tasks: string[], n: number): number {
	const freqMap: Record<string, number> = {};
	for (const t of tasks) {
		freqMap[t] = (freqMap[t] ?? 0) + 1;
	}

	const maxHeap = new MaxPriorityQueue<number>();
	for (const freq of Object.values(freqMap)) {
		maxHeap.enqueue(freq);
	}

	const queue = new Queue<number[]>();
	let time = 0;
	while (!maxHeap.isEmpty() || !queue.isEmpty()) {
		time++;

		if (!maxHeap.isEmpty()) {
			const curr = maxHeap.dequeue();
			if (curr > 1) {
				queue.push([curr - 1, time + n]);
			}
		}

		if (!queue.isEmpty()) {
			const [returnVal, returnTime] = queue.front();
			if (returnTime === time) {
				maxHeap.enqueue(returnVal);
				queue.pop();
			}
		}
	}

	return time;
}
