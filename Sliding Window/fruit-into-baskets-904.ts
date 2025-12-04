// https://leetcode.com/problems/fruit-into-baskets/

// Hint:
// - Translate the requirements into simpler frequency window problem 

// TL;DR:
// Use a frequency map to store the frequency of each fruit in the current window
// Use 2 pointers (left and right) to iterate through the fruits array
// For each right pointer fruit:
//   - If the fruit is not in the frequency map, increment the number of unique fruits and initialize the frequency of the fruit to 0
//   - Increment the frequency of the fruit in the frequency map
//   - While the number of unique fruits is greater than 2, decrement the frequency of the leftmost fruit and increment the left pointer
//   - Update the max number of fruits with max(maxFruits, current window size)

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1), as we have a fixed size of 2 for the frequency map

function totalFruit(fruits: number[]): number {
	const freqMap: Record<number, number> = {};
	let uniques = 0;
	let maxFruits = 0;
	let left = 0;
	for (let right = 0; right < fruits.length; right++) {
		const rightFruit = fruits[right];
		if (!freqMap[rightFruit]) {
			uniques++;
			freqMap[rightFruit] = 0;
		}
		freqMap[rightFruit]++;

		while (uniques > 2) {
			const leftFruit = fruits[left];
			freqMap[leftFruit]--;
			if (freqMap[leftFruit] === 0) {
				uniques--;
				delete freqMap[leftFruit];
			}
			left++;
		}

		maxFruits = Math.max(maxFruits, right - left + 1);
	}

	return maxFruits;
}
