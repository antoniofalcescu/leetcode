// https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/

// TL;DR:
// Build the adjacency list based on the edges
// Iterate through all cities and run Djikstra to find the number of reachable cities within the threshold distance
// Each djikstra method does the following:
//   - Initialize the min PQ and loop through it:
//     - Dequeue the current city and its cost
//     - If the cost is greater than the threshold, break the loop (since it's min PQ all other cities will be with greater cost)
//     - If the city has already been visited, skip it
//     - Otherwise, add the city to the visited set
//     - For each neighbor of the current city, add the neighbor and its cost to the min PQ
//  - Return the number of visited set cities - 1 (since we don't count the current city)
// Return the city with the smallest number of reachable cities

// Complexities:
// Time => O(n * m * log(n)), where n is the number of cities and m is the number of edges
// Space => O(n + m), where n is the number of cities and m is the number of edges

function findTheCity(n: number, edges: number[][], distanceThreshold: number): number {
    const adjList = new Map<number, [number, number][]>();
    for (let i = 0; i < n; i++) {
        adjList.set(i, []);
    }
    for (const [from, to, weight] of edges) {
        adjList.get(from)!.push([to, weight]);
        adjList.get(to)!.push([from, weight]);
    }

    function djikstra(city: number, visited: Set<number>): number {
        const pq = new MinPriorityQueue<[number, number]>((elem) => elem[1]);
        pq.enqueue([city, 0]);

        while (!pq.isEmpty()) {
            const [curr, cost] = pq.dequeue();
            if (cost > distanceThreshold) {
                break;
            }
            if (visited.has(curr)) {
                continue;
            }
            visited.add(curr);

            for (const [nei, neiWeight] of adjList.get(curr)!) {
                pq.enqueue([nei, cost + neiWeight]);
            }
        }

        return visited.size - 1;
    }

    let minReachableCities = Infinity;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        const reachableCities = djikstra(i, new Set<number>());
        if (reachableCities <= minReachableCities) {
            minReachableCities = reachableCities;
            ans = i;
        }
    }

    return ans;
};