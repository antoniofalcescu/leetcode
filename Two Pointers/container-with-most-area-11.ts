// https://leetcode.com/problems/container-with-most-water/

// TL;DR:
// Use 2 pointers (left and right) to iterate through the array and calculate the area between the 2 pointers
// The area is calculated as the width (right - left) * the height (the minimum of the 2 heights at the 2 pointers)
// The max area is updated with max(maxArea, currArea)
// The pointer with the smaller height is moved inward to try to find a larger height

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function maxArea(height: number[]): number {
	let left = 0;
	let right = height.length - 1;
	let maxArea = 0;

	while (left < right) {
		const currArea = (right - left) * Math.min(height[left], height[right]);
		maxArea = Math.max(maxArea, currArea);

		if (height[left] < height[right]) {
			left++;
		} else {
			right--;
		}
	}

	return maxArea;
}
