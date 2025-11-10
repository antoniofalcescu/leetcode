// https://leetcode.com/problems/daily-temperatures/

// TL;DR:
// Use a stack to keep track of the temperatures and the indices
// The main idea is to iterate through the temps array and:
//  - push the values and indices in a stack
//  - while the top of the stack is less than the current temp, pop it and assign the indices difference to the ans array -> This is still O(n) because we only pop each element once
// Return the answer array

// Complexities:
// Time => O(n), where n is the length of the input array -> It's O(N) because we only push each element once and pop each element once -> O(2*N) = O(N)
// Space => O(n), where n is the length of the input array

function dailyTemperatures(temperatures: number[]): number[] {
	const stk: [number, number][] = [];
	const ans = Array.from({ length: temperatures.length }, () => 0);
	for (let i = 0; i < temperatures.length; i++) {
		while (stk.length && stk[stk.length - 1][0] < temperatures[i]) {
			const [stkTemp, stkIdx] = stk.pop() as [number, number];
			ans[stkIdx] = i - stkIdx;
		}

		stk.push([temperatures[i], i]);
	}

	return ans;
}
