// https://leetcode.com/problems/gas-station/

// TL;DR:
// Use a greedy approach
//   - First check if the total gas is less than the total cost, if so, return -1 (impossible to complete the circuit)
//   - Initialize a variable for the answer index and 2 sum variables (one for the current sum and one for the max sum)
//   - Iterate backwards through the gas and cost arrays and update the current sum with the diff
//   - If the current sum is greater than the max sum, update the max sum and the answer index
//   - Return the answer index

// Complexities:
// Time => O(n), where n is the length of the input arrays
// Space => O(1)

function canCompleteCircuit(gas: number[], cost: number[]): number {
	const gasSum = gas.reduce((acc, x) => acc + x, 0);
	const costSum = cost.reduce((acc, x) => acc + x, 0);

	if (costSum > gasSum) {
		return -1;
	}

	let ans = -1;
	let [sum, maxSum] = [0, -1];
	for (let i = gas.length - 1; i >= 0; i--) {
		sum += gas[i] - cost[i];
		if (sum > maxSum) {
			maxSum = sum;
			ans = i;
		}
	}
	return ans;
}
