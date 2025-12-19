// https://leetcode.com/problems/car-pooling/

// TL;DR:
// Sort the trips based on the start time
// Use a min heap to store the trips and pop based on the end time
// Keep track of the number of passengers in the car
// Iterate through the sorted trips:
//   - While the top element from the heap is <= current from position, we can pop it and decrement the number of passengers with the dropoff passengers from the heap
//   - Add the number of passengers to the car
//   - If the number of passengers is greater than the capacity, return false
// Return true

// Complexities:
// Time => O(n * log(n)), where n is the number of trips
// Space => O(n), where n is the number of trips

function carPooling(trips: number[][], capacity: number): boolean {
	trips.sort((a, b) => a[1] - b[1]);
	const minHeap = new MinPriorityQueue<number[]>((elem) => elem[2]);
	for (const trip of trips) {
		minHeap.enqueue(trip);
	}

	let passengers = 0;
	for (const [tripPassengers, from, to] of trips) {
		while (!minHeap.isEmpty() && minHeap.front()[2] <= from) {
			const [dropPassengers, _, __] = minHeap.dequeue();
			passengers -= dropPassengers;
		}

		passengers += tripPassengers;
		if (passengers > capacity) {
			return false;
		}
	}

	return true;
}
