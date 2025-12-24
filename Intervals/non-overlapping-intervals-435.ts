// https://leetcode.com/problems/non-overlapping-intervals/

// TL;DR:
// Sort the intervals by the start time ASC
// Use a prevEnd variable to track the end time of the previous interval
// Iterate through the intervals starting from the second interval:
//   - If the current interval's start time is >= the previous interval's end time, update the prevEnd to the current interval's end time (not overlapping)
//   - Otherwise, increment the answer and update the prevEnd to the minimum of the previous interval's end time and the current interval's end time (overlapping, we "remove" the interval that ends last)
// Return the answer

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(1)

function eraseOverlapIntervals(intervals: number[][]): number {
	intervals.sort((a, b) => a[0] - b[0]);
	let ans = 0;
	let prevEnd = intervals[0][1];
	for (let i = 1; i < intervals.length; i++) {
		const [start, end] = intervals[i];
		if (start >= prevEnd) {
			prevEnd = end;
		} else {
			ans++;
			prevEnd = Math.min(prevEnd, end);
		}
	}

	return ans;
}
