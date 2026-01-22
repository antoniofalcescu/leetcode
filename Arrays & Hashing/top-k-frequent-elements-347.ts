// https://leetcode.com/problems/top-k-frequent-elements/

// TL;DR:
// Use a hash map to store the frequency of each number in the input array
// Use a buckets array of nums size + 1 to store the numbers based on frequency as index
// Iterate through the buckets array and push the numbers to the answer array until we have k numbers

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function topKFrequent(nums: number[], k: number): number[] {
	const freqMap: Record<number, number> = {};
	for (const num of nums) {
		freqMap[num] = (freqMap[num] ?? 0) + 1;
	}

	const maxFreq = Math.max(...Object.values(freqMap));
	const buckets: number[][] = Array.from({ length: maxFreq + 1 }, () => []);
	for (const [numKey, freq] of Object.entries(freqMap)) {
		const num = Number(numKey);
		buckets[freq].push(num);
	}

	const ans: number[] = [];
	for (let i = buckets.length - 1; i >= 0; i--) {
		const remaining = k - ans.length;
		if (remaining === 0) {
			break;
		}

		const slice = buckets[i].slice(0, remaining);
		ans.push(...slice);
	}

	return ans;
}
