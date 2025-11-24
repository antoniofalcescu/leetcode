// https://leetcode.com/problems/largest-rectangle-in-histogram/

// TL;DR:
// Use a monotonic increasing stack to keep track of the [index, height] pairs
// Iterate through the heights array and:
//  - While the current height is less than the height at the top of the stack, pop the stack and calculate the area for the popped pair
//  - Update the max area if the current area is greater
//  - Push the current index (i or the last popped index if we popped elements from the stack and the current heigh was less)  ad height to the stack
// After the heights loop, clean up the stack by popping all elements and calculating the area for the popped pair (using n as the right boundary)
// Return the max area

function largestRectangleArea(heights: number[]): number {
	const n = heights.length;
	const stack: [number, number][] = [];
	let maxArea = 0;

	for (let i = 0; i < n; i++) {
		let idx = i;
		while (stack.length && stack[stack.length - 1][1] > heights[i]) {
			const [poppedIdx, poppedHeight] = stack.pop()!;
			const area = (i - poppedIdx) * poppedHeight;
			maxArea = Math.max(maxArea, area);
			idx = poppedIdx;
		}
		stack.push([idx, heights[i]]);
	}

	while (stack.length) {
		const [idx, height] = stack.pop()!;
		const area = (n - idx) * height;
		maxArea = Math.max(maxArea, area);
	}

	return maxArea;
}
