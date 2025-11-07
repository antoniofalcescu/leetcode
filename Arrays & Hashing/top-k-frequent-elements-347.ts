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
	for (const x of nums) {
		freqMap[x] = (freqMap[x] ?? 0) + 1;
	}

	const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
	for (const [num, freq] of Object.entries(freqMap)) {
		buckets[freq].push(Number(num));
	}

	const ans: number[] = [];
	let j = buckets.length - 1;
	while (k > 0 && j > 0) {
		const bucketLength = buckets[j].length;
		if (bucketLength) {
			const numOfElemsToTake = Math.min(bucketLength, k);
			ans.push(...buckets[j].splice(0, numOfElemsToTake));
			k -= numOfElemsToTake;
		}

		j--;
	}

	return ans;
}
