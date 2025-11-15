// https://leetcode.com/problems/course-schedule-ii/

// TL;DR:
// Convert the prerequisites list to a neighbors map per course
// Run DFS (Topological Sort) on each course from 0 to numCourses - 1 (to cover unconnected courses):
//   - If the course is already in the visiting set, return false (cycle detected)
//   - If the course has been visited, return true (reached a course that can be completed)
//   - Otherwise, mark the course as visiting and recursively call dfs on all its neighbors (if any neighbor returns false, early return false for the current course)
//   - After the recursive call is done:
//       - Remove the course from the visiting set (so it can be visited again by other courses on different paths)
//       - Add the course to the visited set
//       - Add the course to the answer array
//       - Return true for the current course
// Return the answer array

// Complexities:
// Time => O(v + e), where v is the number of courses and e is the number of prerequisites in the graph
// Space => O(v + e), where v is the number of courses and e is the number of prerequisites in the graph

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
	const neighborsMap = new Map();
	for (let i = 0; i < numCourses; i++) {
		neighborsMap.set(i, []);
	}

	for (const [course, prerequisite] of prerequisites) {
		neighborsMap.get(course).push(prerequisite);
	}

	const ans: number[] = [];
	const visited = new Set<number>();
	const visiting = new Set<number>();

	function topologicalDfs(course: number): boolean {
		if (visiting.has(course)) {
			return false;
		}

		if (visited.has(course)) {
			return true;
		}

		visiting.add(course);
		for (const neighbor of neighborsMap.get(course)) {
			if (!topologicalDfs(neighbor)) {
				return false;
			}
		}

		visiting.delete(course);
		visited.add(course);
		ans.push(course);

		return true;
	}

	for (let i = 0; i < numCourses; i++) {
		if (!topologicalDfs(i)) {
			return [];
		}
	}

	return ans;
}
