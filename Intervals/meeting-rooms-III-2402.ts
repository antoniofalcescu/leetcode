// https://leetcode.com/problems/meeting-rooms-iii/

// TL;DR:
// Sort the meetings by the start time ASC
// Use a min heap to store the available rooms
// Use a min heap to store the used rooms and their end times (pop based on end time and, if equal, based on the room index)
// Use a count array to store the number of times each room has been used
// Iterate through the meetings:
//   - While the next used room has end time <= current meeting's start time, dequeue the room and enqueue it to the available rooms (the meeting in that room finished before this meeting)
//   - If there are no available rooms, "wait" until the next one becomes free:
//     - Dequeue the room with the earliest end time and enqueue it to the available rooms
//     - end time of the current meeting = popped meeting's end time + the duration of the current meeting (the meeting in that room will finish after this meeting)
//   - Dequeue the room from the available rooms and enqueue it to the used rooms with the end time of the current meeting
//   - Increment the count of the room
// Return the index of the room with the maximum count

// Complexities:
// Time => O(m * log(m) + m * log(n)), where m is the number of meetings and n is the number of rooms
// Space => O(n), where n is the number of rooms

function mostBooked(n: number, meetings: number[][]): number {
	meetings.sort((a, b) => a[0] - b[0]);
	const available = new MinPriorityQueue<number>();
	for (let i = 0; i < n; i++) {
		available.enqueue(i);
	}
	const used = new PriorityQueue<[number, number]>((a, b) => {
		if (a[1] === b[1]) {
			return a[0] - b[0];
		}
		return a[1] - b[1];
	});
	const count = Array.from({ length: n }, () => 0);
	for (let [start, end] of meetings) {
		while (!used.isEmpty() && used.front()[1] <= start) {
			const [room, _] = used.dequeue();
			available.enqueue(room);
		}

		if (available.isEmpty()) {
			const [room, endTime] = used.dequeue();
			available.enqueue(room);
			end = endTime + (end - start);
		}

		const room = available.dequeue();
		used.enqueue([room, end]);
		count[room]++;
	}

	return count.indexOf(Math.max(...count));
}
