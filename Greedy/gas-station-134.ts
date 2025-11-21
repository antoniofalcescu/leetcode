// https://leetcode.com/problems/gas-station/

// TL;DR:
// Use a greedy approach
//   - First check if the total gas is less than the total cost, if so, return -1 (impossible to complete the circuit)
//   - Initialize a variable for the answer index and a total variable
//   - Iterate through the gas and cost arrays and update the total diff (gas - cost)
//   - If the total is less than 0, reset the total to 0 and update the answer to the next index (greedy choice - current subarray is not helpful for future elements)
//   - This diff total works because we are guaranteed to have a solution (total gas >= total cost)

// Complexities:
// Time => O(n), where n is the length of the input arrays
// Space => O(1)

function canCompleteCircuit(gas: number[], cost: number[]): number {
	const gasSum = gas.reduce((a, b) => a + b, 0);
	const costSum = cost.reduce((a, b) => a + b, 0);
	if (gasSum < costSum) {
		return -1;
	}

	let total = 0;
	let ans = 0;
	for (let i = 0; i < gas.length; i++) {
		total += gas[i] - cost[i];
		if (total < 0) {
			total = 0;
			ans = i + 1;
		}
	}

	return ans;
}
