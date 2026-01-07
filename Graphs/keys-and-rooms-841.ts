// https://leetcode.com/problems/keys-and-rooms/

// TL;DR:
// Build the adjacency list based on the rooms
// Initialize the visited set and run a DFS from the first room (0)
// Return true if the visited set size is equal to the number of rooms (n), otherwise return false

// Complexities:
// Time => O(n + m), where n is the number of rooms and m is the number of keys
// Space => O(n + m), where n is the number of rooms and m is the number of keys

function canVisitAllRooms(rooms: number[][]): boolean {
	const n = rooms.length;
	const adjList = new Map<number, number[]>();
	for (let i = 0; i < n; i++) {
		adjList.set(i, rooms[i]);
	}

	const visited = new Set<number>();
	function dfs(room: number): void {
		if (visited.has(room)) {
			return;
		}
		visited.add(room);
		for (const nei of adjList.get(room)!) {
			dfs(nei);
		}
	}

	dfs(0);
	return visited.size === n;
}
