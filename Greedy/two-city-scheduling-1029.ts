// https://leetcode.com/problems/two-city-scheduling/

// TL;DR:
// Use a greedy approach to sort the costs DESCENDING by the difference between the cost of sending a person to city A and city B
// Keep track of the 2 counters for the number of people sent to city A and city B and the total cost
// Iterate thorugh the sorted array:
//   - If city A is full, send current person to city B
//   - If city B is full, send current person to city A
//   - Otherwise, compare the person's cities costs and send to the cheaper one
// Return the total cost

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(1)

function twoCitySchedCost(costs: number[][]): number {
	const n = costs.length / 2;
	costs.sort((a, b) => Math.abs(b[0] - b[1]) - Math.abs(a[0] - a[1]));
	let cost = 0;
	let [a, b] = [0, 0];
	for (const [aCost, bCost] of costs) {
		if (a === n) {
			b++;
			cost += bCost;
		} else if (b === n) {
			a++;
			cost += aCost;
		} else {
			if (aCost <= bCost) {
				a++;
				cost += aCost;
			} else {
				b++;
				cost += bCost;
			}
		}
	}

	return cost;
}
