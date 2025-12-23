// https://leetcode.com/problems/course-schedule-iv/

// TL;DR:
// Use a DFS approach
//   - Build the initial adjacency list based on the input
//   - Use a map to store the prerequisites for each course
//   - For each course, run DFS to find all the indirect prerequisites:
//     - If the course is already in the map, return the prerequisites for that course
//     - Add all neighbors and their prerequisites for the course to the map of the current course
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
	const adjList: number[][] = Array.from({ length: numCourses }, () => []);
	for (const [crs, pre] of prerequisites) {
		adjList[crs].push(pre);
	}

	const prereqMap = new Map<number, Set<number>>();
	function dfs(crs: number): Set<number> {
		if (prereqMap.has(crs)) {
			return prereqMap.get(crs)!;
		}

		prereqMap.set(crs, new Set());
		for (const pre of adjList[crs]) {
			prereqMap.get(crs)!.add(pre);
			const prereqs = dfs(pre);
			for (const prereq of prereqs) {
				prereqMap.get(crs)!.add(prereq);
			}
		}

		return prereqMap.get(crs)!;
	}

	for (let i = 0; i < numCourses; i++) {
		dfs(i);
	}

	const ans: boolean[] = [];
	for (const [crs, pre] of queries) {
		ans.push(prereqMap.get(crs)!.has(pre));
	}
	return ans;
}
