// https://leetcode.com/problems/course-schedule-iv/

// TL;DR:
// Use a DFS approach
//   - Build the initial adjacency list based on the input
//   - Use a map to store the prerequisites for each course (indirect prerequisites)
//   - For each course, run DFS to find all the indirect prerequisites:
//     - If the course is already in the map, return the prerequisites for that course
//     - Otherwise, add the course itself to its own set in the map and recursively call DFS on all the neighbors of the course
//     - Add all the neighbors prerequisites for the course to the map of the current course (indirect prerequisites)
//     - Return the set of indirect prerequisites for the current course
// Iterate through the queries and check if the prerequisite is in the set of indirect prerequisites for the course

// Complexities:
// Time => O(c * (c + p) + q), where c is the number of courses, p is the number of prerequisites and q is the number of queries
// Space => O(c * (c + p) + q), where c is the number of courses and p is the number of prerequisites and q is the number of queries

function checkIfPrerequisite(
	numCourses: number,
	prerequisites: number[][],
	queries: number[][]
): boolean[] {
	const adjList = Array.from({ length: numCourses }, () => new Set<number>());
	for (const [course, prereq] of prerequisites) {
		adjList[course].add(prereq);
	}

	const prereqMap: Map<number, Set<number>> = new Map();
	function dfs(course: number): Set<number> {
		if (prereqMap.has(course)) {
			return prereqMap.get(course)!;
		}

		prereqMap.set(course, new Set([course]));
		for (const nei of adjList[course]) {
			const prereqs = dfs(nei);
			for (const prereq of prereqs) {
				prereqMap.get(course)!.add(prereq);
			}
		}

		return prereqMap.get(course)!;
	}

	for (let i = 0; i < numCourses; i++) {
		dfs(i);
	}

	const ans: boolean[] = [];
	for (const [course, prereq] of queries) {
		ans.push(prereqMap.get(course)!.has(prereq));
	}

	return ans;
}
