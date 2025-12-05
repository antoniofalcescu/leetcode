// https://leetcode.com/problems/merge-intervals/

// Hint:
// - Draw the number line and visualize in what order we need to merge the ranges

// TL;DR:
// Sort the ranges by the start time ASC
// Use a mergedRanges array to store the merged ranges starting with the first range
// Iterate through the remaining ranges:
//   - If the current range's start time is <= the last merged range's end time, merge them by updating the last merged range's end time to the max of the two end times
//   - Otherwise, add the current range to the merged ranges
// Return the merged ranges

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function merge(ranges: number[][]): number[][] {
	ranges.sort((a, b) => a[0] - b[0]);
	const mergedRanges = [ranges[0]];
	for (let i = 1; i < ranges.length; i++) {
		const range = ranges[i];
		const compareRange = mergedRanges[mergedRanges.length - 1];
		if (range[0] <= compareRange[1]) {
			mergedRanges[mergedRanges.length - 1][1] = Math.max(
				compareRange[1],
				range[1]
			);
		} else {
			mergedRanges.push(range);
		}
	}

	return mergedRanges;
}
