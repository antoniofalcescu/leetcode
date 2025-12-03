// https://leetcode.com/problems/find-the-town-judge/

// Hint:
// - Think of trust array as a graph with incoming and outgoing edges

// TL;DR:
// Use a hash map to store the number of incoming and outgoing relationships for each person
// Iterate through the trust array and update the hash map
// Iterate through the hash map and return the person with n - 1 incoming relationships and 0 outgoing relationships
// Return -1 if no such person exists

// Complexities:
// Time => O(t + n), where t is the number of trust relationships and n is the number of people
// Space => O(n), where n is the number of people

function findJudge(n: number, trust: number[][]): number {
	const relationships = Array.from({ length: n + 1 }, () => [0, 0]); // [incoming, outgoing]
	for (const [a, b] of trust) {
		relationships[a][1]++;
		relationships[b][0]++;
	}
	for (let i = 1; i <= n; i++) {
		const [incoming, outgoing] = relationships[i];
		if (incoming === n - 1 && outgoing === 0) {
			return i;
		}
	}
	return -1;
}
