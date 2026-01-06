// https://leetcode.com/problems/minimum-cost-to-convert-string-i/

// TL;DR:
// Initialize the adjacency list based on the original and changed strings and their costs
// Iterate through all unique characters in the source string and run Djikstra on them to find the minimum cost to reach any other letter in the alphabet
//    - Djikstra uses the min PQ and keeps an inner cache that returns the minimum cost to reach all other ltters this current one is connected to
// Iterate through the source and target strings and for each letter:
//    - If target letter is not in the previously built cache of the source letter, return -1
//    - Otherwise, add the cost to the answer
// Return the answer

// Complexities:
// Time => O(n * E * log(V)) = O(26 * E * log(26)) = O(E), where n is the number of unique characters in source, E is the number of edges (size of original/changed/cost arrays) and V is the number of vertices (26 letters)
// Space => O(V + E) = O(26 + E) = O(E), where V is the number of vertices (26 letters) and E is the number of edges (size of original/changed/cost arrays)

import { MinPriorityQueue } from "@datastructures-js/priority-queue";

function minimumCost(
	source: string,
	target: string,
	original: string[],
	changed: string[],
	cost: number[]
): number {
	const adjList = new Map<string, [string, number][]>();
	for (let i = 0; i < original.length; i++) {
		if (!adjList.has(original[i])) {
			adjList.set(original[i], []);
		}
		adjList.get(original[i])!.push([changed[i], cost[i]]);
	}

	function djikstra(src: string): Map<string, number> {
		const pq = new MinPriorityQueue<[string, number]>((elem) => elem[1]);
		pq.enqueue([src, 0]);
		const srcCache = new Map<string, number>();

		while (!pq.isEmpty()) {
			const [curr, total] = pq.dequeue();
			if (srcCache.has(curr)) {
				continue;
			}
			srcCache.set(curr, total);

			if (!adjList.has(curr)) {
				continue;
			}
			for (const [nei, neiWeight] of adjList.get(curr)!) {
				pq.enqueue([nei, total + neiWeight]);
			}
		}

		return srcCache;
	}

	const cache = new Map<string, Map<string, number>>();
	const uniqueSource = new Set<string>([...source]);
	for (const c of uniqueSource) {
		const result = djikstra(c);
		cache.set(c, result);
	}

	let ans = 0;
	for (let i = 0; i < source.length; i++) {
		const src = source[i];
		const dst = target[i];
		if (!cache.get(src)!.has(dst)) {
			return -1;
		}
		ans += cache.get(src)!.get(dst)!;
	}

	return ans;
}
