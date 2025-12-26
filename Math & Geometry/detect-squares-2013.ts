// https://leetcode.com/problems/detect-squares/

// TL;DR:
// Use a hash map to store the points and their counts since we can have duplicates
// Add:
//   - Parse the point as a string and increment the count in the hash map
// Count:
//   - Initialize a count variable to 0
//   - Iterate through the hash map and for each point (other potential diagonal):
//     - If the current point doesn't form a square with the target point (same x, same y or forms rectangle that is not a square (unequal sides)), continue
//     - Calculate the other two points that form the square with the target point
//     - If all 3 points are in the points map, multiply all of their counts together and add the result to the count
//   - Return the count

// Complexities:
// Time => O(1) for add and O(n) for count, where n is the number of points
// Space => O(n), where n is the number of points

class DetectSquares {
	private readonly points: Map<string, number>;

	constructor() {
		this.points = new Map();
	}

	add(point: number[]): void {
		const parsed = point.join(",");
		const prev = this.points.has(parsed) ? this.points.get(parsed)! : 0;
		this.points.set(parsed, prev + 1);
	}

	count(point: number[]): number {
		let count = 0;
		const [px, py] = point;
		for (const parsed of this.points.keys()) {
			const [x, y] = parsed.split(",").map(Number);
			if (Math.abs(x - px) !== Math.abs(y - py) || x === px || y === py) {
				continue;
			}

			const other1 = [px, y].join(",");
			const other2 = [x, py].join(",");
			if (this.points.has(other1) && this.points.has(other2)) {
				count +=
					this.points.get(parsed)! *
					this.points.get(other1)! *
					this.points.get(other2)!;
			}
		}

		return count;
	}
}
