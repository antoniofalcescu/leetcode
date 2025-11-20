// https://leetcode.com/problems/set-intersection-size-at-least-two/

// TL;DR:
// Use a greedy approach
//   - Sort the intervals by the end time ASC and start time DESC
//   - Use 2 pointers p1 < p2 to track the last 2 numbers in the intersection
//   - For each interval:
//     - if p1 < p2 < start, add 2 to the answer and update both pointers with the rightmost values of the interval
//     - if p1 < start < p2, add 1 to the answer and update p1 with p2 and p2 with the rightmost value of the interval
//     - otherwise, the interval is already covered by the intersection, so do nothing
// Return the answer

// Complexities:
// Time: O(n log n), where n is the length of the intervals array
// Space: O(1)

function intersectionSizeTwo(intervals: number[][]): number {
	intervals.sort((a, b) => {
		if (a[1] !== b[1]) {
			return a[1] - b[1];
		}

		return b[0] - a[0];
	});

	let ans = 0;
	let p1 = -1;
	let p2 = -1;
	for (const [start, end] of intervals) {
		if (p2 < start) {
			ans += 2;
			[p1, p2] = [end - 1, end];
		} else if (p1 < start) {
			ans++;
			[p1, p2] = [p2, end];
		}
	}

	return ans;
}
