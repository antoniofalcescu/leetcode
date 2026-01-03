// https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up/

// TL;DR:
// Use a sliding window approach with a set to store the unique cards in the current window and a variable to store the minimum length
// For each right pointer card:
//   - While the current card is in the set, update the minimum length with the current window size, remove the leftmost card from the set and increment the left pointer
//   - Add the current card to the set
// Return the minimum length or -1 if no duplicate cards are found

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function minimumCardPickup(cards: number[]): number {
	const uniques = new Set<number>();
	let left = 0;
	let length = Infinity;
	for (let right = 0; right < cards.length; right++) {
		while (uniques.has(cards[right])) {
			length = Math.min(length, right - left + 1);
			uniques.delete(cards[left]);
			left++;
		}
		uniques.add(cards[right]);
	}

	return length === Infinity ? -1 : length;
}
