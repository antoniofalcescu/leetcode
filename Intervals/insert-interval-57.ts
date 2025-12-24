// https://leetcode.com/problems/insert-interval/

// TL;DR:
// Create another intervals array as the answer and keep track of the current interval to add
// Iterate through the intervals array until we reach an interval that has its end value >= our interval's to add start value
//   - Add each interval to the asnwer array and increment i pointer
// Iterate through the remaining intervals while the current intervals' start value <= our interval's end value
//   - Update the new interval's start and end to the min and max of the current interval and the new interval and increment i pointer
// Add the updated interval to add to the answer array
// Iterate through the remaining intervals and add them to the answer array
// Return the answer array

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function insert(intervals: number[][], newInterval: number[]): number[][] {
	let i = 0;
	const ans: number[][] = [];
	let [newStart, newEnd] = newInterval;
	while (i < intervals.length && intervals[i][1] < newStart) {
		ans.push(intervals[i]);
		i++;
	}

	while (i < intervals.length && intervals[i][0] <= newEnd) {
		newStart = Math.min(intervals[i][0], newStart);
		newEnd = Math.max(intervals[i][1], newEnd);
		i++;
	}
	ans.push([newStart, newEnd]);

	while (i < intervals.length) {
		ans.push(intervals[i]);
		i++;
	}
	return ans;
}
