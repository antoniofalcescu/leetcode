// https://leetcode.com/problems/cheapest-flights-within-k-stops/

// TL;DR:
// Use Bellman-Ford algorithm
// Create a list of prices (initially Infinity) and set it to 0 for the source node
// Iterate k + 1 times:
//   - Create a temporary prices list to store the updated prices for the current iteration
//   - For each flight, update the temporary price for the target node if the new price is cheaper
//   - Update the prices list with the temporary prices
// Return the price for the destination node, or -1 if it's not reachable after k iterations

// Complexities:
// Time => O(k * e), where k is the number of stops and e is the number of flights
// Space => O(n), where n is the number of nodes

function findCheapestPrice(
	n: number,
	flights: number[][],
	src: number,
	dst: number,
	k: number
): number {
	let prices = Array.from({ length: n }, () => Infinity);
	prices[src] = 0;

	for (let i = 0; i < k + 1; i++) {
		const tempPrices = [...prices];

		for (const [source, target, price] of flights) {
			tempPrices[target] = Math.min(tempPrices[target], prices[source] + price);
		}
		prices = tempPrices;
	}

	return prices[dst] === Infinity ? -1 : prices[dst];
}
