// https://leetcode.com/problems/find-median-from-data-stream/

// Hint:
// - Create 2 partitions of the added numbers with the hjelp of 2 roughly balanced size heaps:
//   - For the addNum method, compare the value to add with both heaps and handle scenario where the heaps become unbalanced
//   - For the findMedian method, calculating the median is trivial, but you need to handle all different size scenarios

// TL;DR:
// Use two priority queues to store the numbers:
//   - One max heap to store the smaller partition of the numbers
//   - One min heap to store the larger partition of the numbers
// When adding a number, add it to the appropriate heap and balance the heaps if necessary
//   - Add the number to the correct partition by comparing it with the first element of the partition (or to the smallPartition by default)
//   - If this addition causes unbalaced heaps (greater than 1 diff), balance them by taking the top element of the larger partition and adding it to the other
// When finding the median, return the median of the two heaps
//   - If one of the partition is greater than the other by 1, return the top element of that partition
//   - If the partitions are of equal size, return the average of the top elements of the two partitions

// Complexities:
// Time => O(log(n)) for addNum, O(1) for findMedian where n is the number of numbers added
// Space => O(n), where n is the number of numbers added

import {
	MinPriorityQueue,
	MaxPriorityQueue,
} from "@datastructures-js/priority-queue";

class MedianFinder {
	private readonly smallPartition: MaxPriorityQueue<number>;
	private readonly bigPartition: MinPriorityQueue<number>;

	constructor() {
		this.smallPartition = new MaxPriorityQueue();
		this.bigPartition = new MinPriorityQueue();
	}

	addNum(num: number): void {
		if (this.smallPartition.isEmpty() || this.smallPartition.front() > num) {
			this.smallPartition.enqueue(num);
		} else {
			this.bigPartition.enqueue(num);
		}

		if (this.smallPartition.size() - this.bigPartition.size() > 1) {
			const biggest = this.smallPartition.dequeue();
			this.bigPartition.enqueue(biggest);
		} else if (this.bigPartition.size() - this.smallPartition.size() > 1) {
			const smallest = this.bigPartition.dequeue();
			this.smallPartition.enqueue(smallest);
		}
	}

	findMedian(): number {
		if (this.smallPartition.size() > this.bigPartition.size()) {
			return this.smallPartition.front();
		} else if (this.bigPartition.size() > this.smallPartition.size()) {
			return this.bigPartition.front();
		} else {
			return (this.smallPartition.front() + this.bigPartition.front()) / 2;
		}
	}
}
