// https://leetcode.com/problems/lemonade-change/

// TL;DR:
// Use a greedy approach
//   - Initialize a variable for the number of fives and tens
//   - Iterate through the bills and for each bill:
//     - If the bill is 5, increment the number of fives
//     - If the bill is 10:
//       - If we have at least one five, decrement the number of fives and increment the number of tens
//       - Otherwise, return false
//     - If the bill is 20:
//       - If we have at least one ten and one five, decrement the number of fives and decrement the number of tens
//       - Otherwise, if we have at least three five, decrement the number of fives by three
//       - Otherwise, return false
//   - Return true

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function lemonadeChange(bills: number[]): boolean {
	let fives = 0;
	let tens = 0;
	for (const bill of bills) {
		if (bill === 5) {
			fives++;
		} else if (bill === 10) {
			if (fives >= 1) {
				fives--;
				tens++;
			} else {
				return false;
			}
		} else if (bill === 20) {
			if (tens >= 1 && fives >= 1) {
				tens--;
				fives--;
			} else if (fives >= 3) {
				fives -= 3;
			} else {
				return false;
			}
		}
	}

	return true;
}
