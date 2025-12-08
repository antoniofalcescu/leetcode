// https://leetcode.com/problems/max-number-of-k-sum-pairs/

// Hint:
// - Variant of Two Sum

// TL;DR:
// Use a hash map to store the frequency of each number in the input array
// Iterate through the input array and:
//   - Calculate the needed number to make the current number and the needed number sum up to k
//   - If the needed number exists in the hash map, increment the answer and decrement the frequency of the needed number
//   - Otherwise, increment the frequency of the current number
// Return the answer

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the number of unique numbers in the input array

function maxOperations(nums: number[], k: number): number {
	const freqMap = {};
	let ans = 0;
	for (const num of nums) {
		const needed = k - num;
		if (freqMap[needed]) {
			ans++;
			freqMap[needed]--;
		} else {
			freqMap[num] = (freqMap[num] ?? 0) + 1;
		}
	}
	return ans;
}
