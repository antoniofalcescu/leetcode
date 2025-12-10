// https://leetcode.com/problems/boats-to-save-people/

// Hint:
// - Be greedy on pairing the persons

// TL;DR:
// Sort the array so that we can easily pair heaviest and lighest person (or get the heaviest person alone if needed)
// Use two pointers to iterate through the array
// The left pointer will point to the lightest person and the right pointer will point to the heaviest person
// If the sum of the two people is less than or equal to the limit, we can put them in the same boat and increment the left pointer
// Otherwise, we put the heaviest person in a boat and decrement the right pointer
// Return the number of boats needed

// Complexities:
// Basic sorting:
//    - Time => O(n * log(n)), where n is the length of the input array
//    - Space => O(1)
// Possible optimization depending on max weight allowed with Count Sort:
//    - Time => O(n + m) = O(n) in this casse, where n is the length of the input array and m is the max weight allowed
//    - Space => O(m), where m is the max weight allowed

function numRescueBoats(people: number[], limit: number): number {
	people.sort((a, b) => a - b);
	let boats = 0;
	let [left, right] = [0, people.length - 1];
	while (left <= right) {
		if (people[left] + people[right] <= limit) {
			left++;
		}

		right--;
		boats++;
	}

	return boats;
}
