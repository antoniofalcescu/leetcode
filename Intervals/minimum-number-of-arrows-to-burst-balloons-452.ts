// https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/

// TL;DR:
// Sort the points by the start value ASC
// Use a endMin variable to track the minimum end time of the current arrow
// Initialize the arrows count with the length of the points array (assume worst case)
// Iterate through the points starting from the second point:
//   - If current point's start <= endMin, decrement the arrows and update the endMin with min(endMin, current point's end)
//   - Otherwise, update the endMin with the current point's end
// Return the arrows count

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(1)

function findMinArrowShots(points: number[][]): number {
    points.sort((a, b) => a[0] - b[0]);
    let arrows = points.length;
    let endMin = points[0][1];
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] <= endMin) {
            arrows--;
            endMin = Math.min(endMin, points[i][1]);
        } else {
            endMin = points[i][1];
        }
    }

    return arrows;
};