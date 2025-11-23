// https://leetcode.com/problems/trapping-rain-water/

// TL;DR:
// Keep track of the max left and right heights and use the 2 left/right pointers to iterate by always taking the smaller height and calculate the water trapped in that cell:
//   - Whichever height is smaller, calculate the water in that cell based on max left/right and the current height
//   - Update the max left/right heights accordingly
//   - Move the pointer inward that took the smaller height
// Return the total water trapped

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function trap(height: number[]): number {
	let water = 0;
	let [left, right] = [0, height.length - 1];
	let [maxLeft, maxRight] = [0, 0];
	while (left < right) {
		let currWater = 0;
		if (height[left] <= height[right]) {
			currWater = Math.max(maxLeft - height[left], 0);
			maxLeft = Math.max(maxLeft, height[left]);
			left++;
		} else {
			currWater = Math.max(maxRight - height[right], 0);
			maxRight = Math.max(maxRight, height[right]);
			right--;
		}
		water += currWater;
	}

	return water;
}
