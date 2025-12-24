// https://neetcode.io/problems/meeting-schedule

// TL;DR:
// Sort the intervals by the start time ASC
// Iterate through the intervals starting from the second interval:
//   - If the current interval's start time is < the previous interval's end time, return false (overlapping)
// Return true

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

class MeetingRoomsSolution {
	/**
	 * @param {Interval[]} intervals
	 * @returns {boolean}
	 */
	canAttendMeetings(intervals) {
		intervals.sort((a, b) => a.start - b.start);
		for (let i = 1; i < intervals.length; i++) {
			if (intervals[i - 1].end > intervals[i].start) {
				return false;
			}
		}
		return true;
	}
}
