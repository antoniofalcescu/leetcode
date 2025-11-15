// https://leetcode.com/problems/course-schedule/

// TL;DR:
// Convert the prerequisites list to a neighbors map per course
// Run DFS on each course from 0 to numCourses - 1 (to cover unconnected courses):
//   - If the course is already in the visiting set, return false (cycle detected)
//   - If the course has no prerequisites, return true (reached a course that can be completed)
//   - Otherwise, mark the course as visiting and recursively call dfs on all its neighbors (if any neighbor returns false, early return false for the current course)
//   - After the recursive call is done:
//       - Remove the course from the visiting set (so it can be visited again by other courses on different paths)
//       - Remove the course's neighbors (so that other courses that depend on it can early return true)
//       - Return true for the current course
// Return true if all courses can be finished, otherwise return false

// Complexities:
// Time => O(v + e), where v is the number of courses and e is the number of prerequisites in the graph
// Space => O(v + e), where v is the number of courses and e is the number of prerequisites in the graph

function canFinishCourses(
	numCourses: number,
	prerequisites: number[][]
): boolean {
	const neighborsMap = new Map();
	for (let i = 0; i < numCourses; i++) {
		neighborsMap.set(i, []);
	}

	for (const [course, prerequisite] of prerequisites) {
		neighborsMap.get(course).push(prerequisite);
	}

	const visiting = new Set();

	function dfs(course: number): boolean {
		if (visiting.has(course)) {
			return false;
		}

		if (neighborsMap.get(course).length === 0) {
			return true;
		}

		visiting.add(course);
		for (const neighbor of neighborsMap.get(course)) {
			if (!dfs(neighbor)) {
				return false;
			}
		}
		neighborsMap.set(course, []);
		visiting.delete(course);

		return true;
	}

	for (let i = 0; i < numCourses; i++) {
		if (!dfs(i)) {
			return false;
		}
	}

	return true;
}
