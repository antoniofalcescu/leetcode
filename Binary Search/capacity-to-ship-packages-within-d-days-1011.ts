// https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/

// Hint:
// - Brute force it and then think on how to optimize checking if a ship capacity is valid

// TL;DR:
// Similar to Koko Eating Bananas problem, we can try every possible ship capacity with the possible range with a binary search

// Complexities:
// Time => O(n log n), where n is the length of the input array
// Space => O(1)

function canLoad(weights: number[], days: number, ship: number): boolean {
	let sum = 0;
	let currDays = 0;

	for (const weight of weights) {
		if (sum + weight > ship) {
			sum = 0;
			currDays++;
		}
		sum += weight;
	}

	return currDays + 1 <= days;
}

function shipWithinDays(weights: number[], days: number): number {
	let left = Math.max(...weights);
	let right = weights.reduce((acc, weight) => acc + weight, 0);
	let ans = 0;

	while (left <= right) {
		const ship = Math.floor((left + right) / 2);
		if (canLoad(weights, days, ship)) {
			ans = ship;
			right = ship - 1;
		} else {
			left = ship + 1;
		}
	}

	return ans;
}
