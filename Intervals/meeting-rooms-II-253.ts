// https://neetcode.io/problems/meeting-rooms-ii

// TL;DR:
// Split the intervals into 2 sorted starts and ends arrays:
//   - starts = always take the earliest start time meeting
//   - ends = always take the earliest end time meeting
// Use 2 pointers to iterate through the starts and ends arrays
//   - If the current start is < the current end:
//     - Increment the starts pointer, the days count and update the answer if days is greater
//   - Otherwise:
//     - Increment the ends pointer and decrement the days count

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(1)

/**
 * Definition of Interval:
 * class Interval {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

class MeetingRoomsIISolution {
	/**
	 * @param {Interval[]} intervals
	 * @returns {number}
	 */
	minMeetingRooms(intervals) {
		const starts: number[] = [];
		const ends: number[] = [];
		for (const interval of intervals) {
			starts.push(interval.start);
			ends.push(interval.end);
		}
		starts.sort((a, b) => a - b);
		ends.sort((a, b) => a - b);

		let ans = 0;
		let days = 0;
		let [i, j] = [0, 0];
		while (i < starts.length) {
			if (starts[i] < ends[j]) {
				i++;
				days++;
				ans = Math.max(ans, days);
			} else {
				j++;
				days--;
			}
		}

		return ans;
	}
}
