// https://leetcode.com/problems/process-tasks-using-servers/

// TL;DR:
// Use a min priority queue to store the available servers based on the weight and index
// Use a min priority queue to store the used servers based on the end time and index
// Keep track of the current time
// Iterate through the tasks:
//   - Update the time to the maximum of the current time and the task index
//   - Check what used servers can become available if they finished their task
//   - If there are still no available servers, update the time to the end time of the next used server and free all used servers that end at this new time
//   - Take the first available server and assign the task to it, mark it as used with the end time of the current time + the task duration and add it to the answer array
// Return the answer array

// Complexities:
// Time => O(n(n + m) * log(n)), where n is the number of servers and m is the number of tasks
// Space => O(n), where n is the number of servers

function assignTasks(servers: number[], tasks: number[]): number[] {
	const available = new PriorityQueue<[number, number]>((a, b) => {
		if (a[0] === b[0]) {
			return a[1] - b[1];
		}

		return a[0] - b[0];
	});
	for (let i = 0; i < servers.length; i++) {
		available.enqueue([servers[i], i]);
	}

	const used = new MinPriorityQueue<[number, number]>((elem) => elem[0]);

	const ans = [];
	let time = 0;
	for (let j = 0; j < tasks.length; j++) {
		time = Math.max(time, j);
		while (!used.isEmpty() && used.front()[0] <= time) {
			const [_, serverIdx] = used.dequeue();
			available.enqueue([servers[serverIdx], serverIdx]);
		}

		if (available.isEmpty()) {
			time = used.front()[0];
			while (!used.isEmpty() && used.front()[0] <= time) {
				const [_, serverIdx] = used.dequeue();
				available.enqueue([servers[serverIdx], serverIdx]);
			}
		}

		const [_, serverIdx] = available.dequeue();
		ans.push(serverIdx);
		used.push([time + tasks[j], serverIdx]);
	}

	return ans;
}
