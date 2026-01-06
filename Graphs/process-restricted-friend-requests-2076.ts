// https://leetcode.com/problems/process-restricted-friend-requests/

// TL;DR:
// DSU approach with special Union logic to not merge restricted friends
// Create the parents and ranks arrays, define the basic find method with path compression
// Iterate through the requests and call the union method to check if the two friends can be friends (append the result to the answer array):
// Inside the union method:
//   - Get the parents of the two friend in the request
//   - If they are already part of the same component, return true (nothing changes, they were already indirect friends)
//   - Loop over the restrictions where we have the following possible cases:
//     - 1. the 2 restricted friends are already in one of the 2 components (impossible for the problem, they can never be part of the same group as we don't merge them if that's the case)
//     - 2. the 2 restricted friends are in 2 separate components:
//       - If one of the restricted friends in the same component as one of the friends in the request and the other is too with the other friend, it means they will join in the same component after the merge -> impossible, return false
//       - Check is: (bannedParent1 === parent1 && bannedParent2 === parent2) || (bannedParent1 === parent2 && bannedParent2 === parent1) -> return false
//   - Otherwise, if all restrictions are satisfied, merge the two friends with basic Union logicand return true
// Return the answer array

// Complexities:
// Time => O(n * m), where n is the number of requests and m is the number of restrictions
// Space => O(n), where n is the number of friends

function friendRequests(
	n: number,
	restrictions: number[][],
	requests: number[][]
): boolean[] {
	const parents = Array.from({ length: n }, (_, i) => i);
	const ranks = Array.from({ length: n }, () => 1);

	function find(node: number): number {
		while (node !== parents[node]) {
			parents[node] = parents[parents[node]];
			node = parents[node];
		}

		return node;
	}

	function union(node1: number, node2: number): boolean {
		// true if can be friends, false otherwise
		const [parent1, parent2] = [find(node1), find(node2)];
		if (parent1 === parent2) {
			return true;
		}

		for (const [bannedFriend1, bannedFriend2] of restrictions) {
			const [bannedParent1, bannedParent2] = [
				find(bannedFriend1),
				find(bannedFriend2),
			];
			if (
				(bannedParent1 === parent1 && bannedParent2 === parent2) ||
				(bannedParent1 === parent2 && bannedParent2 === parent1)
			) {
				return false;
			}
		}

		if (ranks[parent1] >= ranks[parent2]) {
			parents[parent2] = parent1;
			ranks[parent1] += ranks[parent2];
		} else {
			parents[parent1] = parent2;
			ranks[parent2] += ranks[parent1];
		}

		return true;
	}

	const ans: boolean[] = [];
	for (const [friend1, friend2] of requests) {
		ans.push(union(friend1, friend2));
	}
	return ans;
}
