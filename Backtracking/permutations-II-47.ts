// https://leetcode.com/problems/permutations-ii/

// TL;DR:
// Count the frequency of each number in the input array and run backtracking with the frequency map as the input
//   - Base case: if the current permutation is of length nums.length, push it to the answer array and return
//   - Iterate through the frequency map and for each number:
//     - If the frequency is 0, continue
//     - Decrement the frequency and add the number to the current permutation
//     - Recursively call the bkt function
//     - Increment the frequency and remove the number from the current permutation (revert)

// Complexities:
// Time => O(n! * n), where n is the length of the input array
// Space => O(n! * n), where n is the length of the input array

function permuteUnique(nums: number[]): number[][] {
	const freqMap: Record<number, number> = {};
	for (const num of nums) {
		freqMap[num] = (freqMap[num] ?? 0) + 1;
	}

	const ans: number[][] = [];
	const curr: number[] = [];
	function bkt(): void {
		if (curr.length === nums.length) {
			ans.push([...curr]);
			return;
		}

		for (const [num, freq] of Object.entries(freqMap)) {
			if (!freq) {
				continue;
			}

			freqMap[num]--;
			curr.push(Number(num));

			bkt();

			freqMap[num]++;
			curr.pop();
		}
	}
	bkt();
	return ans;
}
