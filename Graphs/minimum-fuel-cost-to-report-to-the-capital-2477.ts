// https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/

// TL;DR:
// Bottom-up DFS approach where we start from the root (0) and add up how much fuel it costs for each subtree node to reach the current subtree root
// Build the adj list based on the roads
// Create a DFS helper:
//   - Initialize the people count to 1 for the current node
//   - For each neighbor of the current node:
//     - If the neighbor is the parent, skip it
//     - Otherwise, recursively call the DFS helper on the neighbor to get the number of people in the subtree with that neighbor as the root
//     - The fuel cost for all subtree people to reach the current node is Math.ceil(subtreePeople / seats)
//     - Add the fuel cost to the total fuel cost
//     - Add the number of people in the subtree to the current node's people count
//   - Return the number of people in the current subtree
// Return the total fuel cost

// Complexities:
// Time => O(n), where n is the number of nodes in the graph
// Space => O(n), where n is the number of nodes in the graph

function minimumFuelCost(roads: number[][], seats: number): number {
	const n = roads.length + 1;
	const adjList = new Map<number, number[]>();
	for (let i = 0; i < n; i++) {
		adjList.set(i, []);
	}
	for (const [node1, node2] of roads) {
		adjList.get(node1)!.push(node2);
		adjList.get(node2)!.push(node1);
	}

	let totalFuel = 0;

	function dfs(node: number, parent: number): number {
		let people = 1;
		for (const nei of adjList.get(node)!) {
			if (nei === parent) {
				continue;
			}

			const subtreePeople = dfs(nei, node);
			const fuelToReachAllSubtreePeople = Math.ceil(subtreePeople / seats);
			totalFuel += fuelToReachAllSubtreePeople;
			people += subtreePeople;
		}

		return people;
	}
	dfs(0, -1);

	return totalFuel;
}
