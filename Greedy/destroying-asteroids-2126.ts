// https://leetcode.com/problems/destroying-asteroids/

// TL;DR:
// Sort the asteroids array ASC
// Iterate through the asteroids array and:
//   - If the current asteroid is greater than the mass, return false (cannot destroy it)
//   - Otherwise, add the asteroid to the mass
// Return true

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(1)

function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
	asteroids.sort((a, b) => a - b);
	for (const asteroid of asteroids) {
		if (asteroid > mass) {
			return false;
		}
		mass += asteroid;
	}

	return true;
}
