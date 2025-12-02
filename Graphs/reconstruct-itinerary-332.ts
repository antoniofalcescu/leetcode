// https://leetcode.com/problems/reconstruct-itinerary/

// Hint:
// - DFS gives TLE because of O(E * V) TC (O(E^2) worst case), Hierholzer's Algorithm is the optimal solution

// TL;DR:
// Use Hierholzer's algorithm to find the Eulerian path in the graph (a path that visits all edges exactly once)
//   - Convert the tickets to an adjacency list
//   - Sort each neighbors list in the adjacency list and reverse them so that we can pop the last element (which will be the next lexicographically smallest airport to visit)
//   - Run recursive Hierholzer to traverse the graph:
//     - While the current airport has neighbors:
//       - Pop the last element from the neighbors list (which will be the next lexicographically smallest airport to visit)
//       - Recursively call Hierholzer on the next airport
//     - When we reach a dead end, add the current airport to the itinerary
//   - Return the itinerary in reverse order (since we added the airports to the answer array from dead ends to start)

// Complexities:
// Time => O(E * log(E)), where E is the number of edges in the graph (from the sorting, running Hierholzer is O(E))
// Space => O(E), where E is the number of edges in the graph

function findItinerary(tickets: string[][]): string[] {
	const adjList: Record<string, string[]> = {};
	for (const [from, to] of tickets) {
		if (!adjList[from]) {
			adjList[from] = [];
		}
		adjList[from].push(to);
	}

	for (const from of Object.keys(adjList)) {
		adjList[from].sort().reverse();
	}

	const ans: string[] = [];
	function hierholzer(airport: string) {
		while (adjList[airport]?.length > 0) {
			const next = adjList[airport].pop()!;
			hierholzer(next);
		}
		ans.push(airport);
	}

	hierholzer("JFK");
	return ans.reverse();
}
