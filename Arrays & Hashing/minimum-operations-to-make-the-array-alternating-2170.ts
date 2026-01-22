// https://leetcode.com/problems/minimum-operations-to-make-the-array-alternating/

// TL;DR:
// The trick is to see that the final array will have only 2 alternating numbers, with all odd position values beign equal and all even position values being equal (different values)
// Use 2 frequency maps (odd positions and even positions) to count the frequency of each number in the array
// Find the 2 most frequent numbers for odd and even indices
// If the odd max element is different than the even max element, return n - oddMaxFreq - evenMaxFreq
// Otherwise, return min(n - oddMaxFreq - even2ndMaxFreq, n - evenMaxFreq - odd2ndMaxFreq)

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the number of unique numbers in the input array

function minimumOperations(nums: number[]): number {
	const oddFreq: Record<number, number> = {};
	const evenFreq: Record<number, number> = {};

	for (let i = 0; i < nums.length; i++) {
		if (i % 2 === 0) {
			evenFreq[nums[i]] = (evenFreq[nums[i]] ?? 0) + 1;
		} else {
			oddFreq[nums[i]] = (oddFreq[nums[i]] ?? 0) + 1;
		}
	}

	let [odd1, odd2] = [-1, -1];
	for (const [numKey, freq] of Object.entries(oddFreq)) {
		const num = Number(numKey);
		if (odd1 === -1 || freq > oddFreq[odd1]) {
			odd2 = odd1;
			odd1 = num;
		} else if (odd2 === -1 || freq > oddFreq[odd2]) {
			odd2 = num;
		}
	}

	let [even1, even2] = [-1, -1];
	for (const [numKey, freq] of Object.entries(evenFreq)) {
		const num = Number(numKey);
		if (even1 === -1 || freq > evenFreq[even1]) {
			even2 = even1;
			even1 = num;
		} else if (even2 === -1 || freq > evenFreq[even2]) {
			even2 = num;
		}
	}

	if (odd1 !== even1) {
		return nums.length - (oddFreq[odd1] ?? 0) - (evenFreq[even1] ?? 0);
	}

	return Math.min(
		nums.length - (oddFreq[odd1] ?? 0) - (evenFreq[even2] ?? 0),
		nums.length - (evenFreq[even1] ?? 0) - (oddFreq[odd2] ?? 0)
	);
}
