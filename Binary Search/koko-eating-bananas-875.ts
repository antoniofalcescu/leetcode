// https://leetcode.com/problems/koko-eating-bananas/

// TL;DR:
// Create a util function to check if Koko can finish all the bananas in the given hours with a given eating speed
// Use a binary search to find the minimum eating speed in which Koko can finish all the bananas in the given hours (range is [1...max(piles)])
//  - if Koko can finish all piles for a given speed, we try to find a lower speed by decrementing the right pointer
//  - if Koko can't finish all piles for a given speed, we try to find a higher speed by incrementing the left pointer
// Return the left pointer as the minimum eating speed

// Complexities:
// Time => O(log(max(piles)) * n), where max(piles) is the maximum number of bananas in a pile and n is the number of piles
// Space => O(1)

function canFinish(piles: number[], h: number, k: number): boolean {
	let time = 0;

	for (const pile of piles) {
		const timeForPile = Math.ceil(pile / k);
		time += timeForPile;
		if (time > h) {
			return false;
		}
	}

	return true;
}

function minEatingSpeed(piles: number[], h: number): number {
	let left = 1;
	let right = Math.max(...piles);

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		const canFinishForMid = canFinish(piles, h, mid);

		if (canFinishForMid) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	return left;
}
