// https://leetcode.com/problems/minimum-penalty-for-a-shop/

// TL;DR:
// Keep track of a rolling counter for the before N customers and after Y customers and take the minimum sum of the two
// Initialize the after counter with the number of Y customers in the string and before counter with 0
// Initialize the minIdx and min penalty sum variables with 0 and after + before sum respectively
// Iterate through the customers string from 1 to n (inclusive):
//   - If the previous i - 1 customer was a Y, decrement the after counter
//   - If the previous i - 1 customer was an N, increment the before counter
//   - If the current before + after sum < min, update the minIdx and min variables
// Return the minIdx

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1)

function bestClosingTime(customers: string): number {
	const n = customers.length;
	let [before, after] = [0, 0];
	for (const customer of customers) {
		if (customer === "Y") {
			after++;
		}
	}
	let [minIdx, min] = [0, before + after];
	for (let i = 1; i <= n; i++) {
		if (customers[i - 1] === "N") {
			before++;
		} else {
			after--;
		}

		if (after + before < min) {
			minIdx = i;
			min = after + before;
		}
	}
	return minIdx;
}
