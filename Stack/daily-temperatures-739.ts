// https://leetcode.com/problems/daily-temperatures/

// TL;DR:
// Use a monotonic decreasing stack to keep track of the indices of the temperatures
// Iterate through the temps array and:
//  - pop all stack elements that are less than the current temp and add the indices difference to the ans array
//  - push the current index to the stack

function dailyTemperatures(temperatures: number[]): number[] {
	const ans = Array.from({ length: temperatures.length }, () => 0);
	const stack: number[] = [];
	for (let i = 0; i < temperatures.length; i++) {
		while (
			stack.length > 0 &&
			temperatures[stack[stack.length - 1]] < temperatures[i]
		) {
			const top = stack.pop() as number;
			ans[top] = i - top;
		}
		stack.push(i);
	}

	return ans;
}
