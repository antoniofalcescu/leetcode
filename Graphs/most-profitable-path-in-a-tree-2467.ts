// https://leetcode.com/problems/most-profitable-path-in-a-tree/

// Hint:
//  - Do 1 traversal to find the shortest path for Bob to reach the Root and then another traversal for Alice to all possible leaves and keep track of a global max sum comparing each cost with Bob's path

// TL;DR:
// Build the adjacency list based on the edges
// Get all leaves nodes (only 1 neighbor, except root)
// Run a DFS to find the shortest path for Bob to reach the Root and store the path in a array
// Create a map to store the [value-index] pairs for Bob's path
// Run a BFS for Alice and keep track of the time a node is reached and a global max sum:
//   - Loop through all nodes in the current level and pop each node:
//     - If the node has been already visited, skip it
//     - Check the node's cost by comparing it with Bob's map index:
//       - If the node is not in Bob's path or the time is less than the index in Bob's path, add the cost to the sum
//       - If the node is in Bob's path and the time is equal to the index in Bob's path, add half of the cost to the sum
//       - Otherwise, cost is 0
//     - Add the cost to the current sum and mark the current node as visited
//     - If the node is a leaf, update the global max sum and continue to the next nodes
//     - Otherwise, go to all neighbors and add the [neighbor, sum] to the queue
//   - Increment the time and continue to the next level
// Return the global max sum as the answer

// Complexities:
// Time => O(n), where n is the number of nodes in the tree
// Space => O(n), where n is the number of nodes in the tree

function mostProfitablePath(
	edges: number[][],
	bob: number,
	amount: number[]
): number {
	const adjList = new Map<number, number[]>();
	for (const [node1, node2] of edges) {
		if (!adjList.has(node1)) {
			adjList.set(node1, []);
		}
		if (!adjList.has(node2)) {
			adjList.set(node2, []);
		}
		adjList.get(node1)!.push(node2);
		adjList.get(node2)!.push(node1);
	}

	const bobPath: number[] = [];
	function bobDfs(node: number, visited: Set<number>): boolean {
		if (visited.has(node)) {
			return false;
		}
		if (node === bob) {
			bobPath.push(node);
			return true;
		}

		visited.add(node);
		for (const nei of adjList.get(node)!) {
			if (bobDfs(nei, visited)) {
				bobPath.push(node);
				return true;
			}
		}

		return false;
	}
	bobDfs(0, new Set<number>());
	const bobMap = new Map<number, number>();
	for (let i = 0; i < bobPath.length; i++) {
		bobMap.set(bobPath[i], i);
	}

	const leaves = new Set<number>();
	for (const [node, neis] of adjList.entries()) {
		if (node !== 0 && neis.length === 1) {
			leaves.add(node);
		}
	}

	let maxSum = -Infinity;
	const alice = new Queue<[number, number]>([[0, 0]]);
	const visited = new Set<number>();
	let time = 0;
	while (!alice.isEmpty()) {
		const size = alice.size();
		for (let i = 0; i < size; i++) {
			let [node, sum] = alice.pop();
			if (visited.has(node)) {
				continue;
			}

			let cost = 0;
			if (!bobMap.has(node) || bobMap.get(node)! > time) {
				cost = amount[node];
			} else if (bobMap.get(node) === time) {
				cost = amount[node] / 2;
			}

			visited.add(node);
			sum += cost;

			if (leaves.has(node)) {
				maxSum = Math.max(maxSum, sum);
				continue;
			}

			for (const nei of adjList.get(node)!) {
				alice.push([nei, sum]);
			}
		}
		time++;
	}

	return maxSum;
}
