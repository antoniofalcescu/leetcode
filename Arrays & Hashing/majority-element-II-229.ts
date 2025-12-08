// https://leetcode.com/problems/majority-element-ii/

// Hint:
// - At most 2 candidates can have their frequency greater than n / 3
// - Variant of the Boyer-Moore Voting Algorithm with a frequency map to store the possible candidates and their frequencies

// TL;DR:
// Boyer-Moore Voting Algorithm with a frequency map to store the possible candidates and their frequencies
// Create a frquency that will have at most 2 candidates (O(1) space)
// Iterate through the input array and:
//   - Increment the frequency of the current number in the frequency map
//   - If the frequency map has more than 2 candidates, decrement all current candidates count by 1 and delete the ones that have a count of 0
// Iterate through the last 2 possible candidates and calcualte their real frequency in the input array, if they have the real frequency greater than n / 3, add them to the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1), as we have a fixed size of 2 for the frequency map

function majorityElement(nums: number[]): number[] {
	const target = nums.length / 3;
	let freqMap: Record<number, number> = {};
	for (const num of nums) {
		freqMap[num] = (freqMap[num] ?? 0) + 1;

		if (Object.keys(freqMap).length > 2) {
			const newFreqMap = {};
			for (const [numKey, freq] of Object.entries(freqMap)) {
				if (freq > 1) {
					newFreqMap[numKey] = freq - 1;
				}
			}
			freqMap = newFreqMap;
		}
	}

	const ans: number[] = [];
	for (const numKey of Object.keys(freqMap)) {
		const num = Number(numKey);
		const realFreq = nums.filter((x) => x === num).length;
		if (realFreq > target) {
			ans.push(num);
		}
	}
	return ans;
}
