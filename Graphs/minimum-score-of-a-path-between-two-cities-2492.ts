// https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/

// TL;DR:
// Build the adjacency list based on the roads
// Use a BFS approach to go through all neighbors from the starting city (1) and keep track of the minimum score
//   - Initialize the queue with the starting city (1) and the visited set with the starting city
//   - While the queue is not empty, dequeue the current city
//   - For each neighbor of the current city, update the minimum score if the cost is less than the current minimum score
//   - Add the neighbor to the queue and mark it as visited if it has not been visited
// Return the minimum score

// Complexities:
// Time => O(n + m), where n is the number of cities and m is the number of roads
// Space => O(n + m), where n is the number of cities and m is the number of roads

function minScore(n: number, roads: number[][]): number {
    const adjList = new Map<number, [number, number][]>();
    for (let i = 1; i <= n; i++) {
        adjList.set(i, []);
    }
    for (const [from, to, cost] of roads) {
        adjList.get(from)!.push([to, cost]);
        adjList.get(to)!.push([from, cost]);
    }

    const queue = new Queue<number>([1]);
    const visited = new Set<number>([1]);
    let min = Infinity;
    while (!queue.isEmpty()) {
        const city = queue.pop();
        for (const [nei, cost] of adjList.get(city)!) {
            min = Math.min(min, cost);
            if (!visited.has(nei)) {
                visited.add(city);
                queue.push(nei);
            }
        }
    }

    return min;
};