// https://leetcode.com/problems/sliding-subarray-beauty/

// TL;DR:
// Use a Sliding Window approach where we keep track of the current window negative numbers frequencies since nums[i] can have at most 50 negative values
// Use a frequency map to store the frequency of each negative number in the current window
// Use a currentNegatives variable to store the number of negative numbers in the current window
// For each right pointer:
//   - If the current number is negative, add it to the frequency map and increment the currentNegatives variable
//   - If the window size is equal to k:
//     - If the number of negative numbers is less than x, push 0 to the answer array
//     - Otherwise, sort the frequency map keys ASC, loop through the sorted keys and count their frequencies until we reach x, the key that made count >= x is pushed to the answer and we break the loop
//     - If the leftmost number is negative, decrement/delete the frequency accordingly, decrement the currentNegatives variable and increment left pointer
// Return the answer array

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1)

function getSubarrayBeauty(nums: number[], k: number, x: number): number[] {
	const n = nums.length;
	const ans: number[] = [];
	const freqMap: Record<number, number> = {};
	let currentNegatives = 0;
	let left = 0;
	for (let right = 0; right < n; right++) {
		if (nums[right] < 0) {
			freqMap[nums[right]] = (freqMap[nums[right]] ?? 0) + 1;
			currentNegatives++;
		}

		if (right - left + 1 === k) {
			if (currentNegatives < x) {
				ans.push(0);
			} else {
				const sortedNums = Object.keys(freqMap)
					.map(Number)
					.sort((a, b) => a - b);
				let count = 0;
				for (const key of sortedNums) {
					count += freqMap[key];
					if (count >= x) {
						ans.push(key);
						break;
					}
				}
			}
			if (nums[left] < 0) {
				freqMap[nums[left]]--;
				if (freqMap[nums[left]] === 0) {
					delete freqMap[nums[left]];
				}
				currentNegatives--;
			}
			left++;
		}
	}

	return ans;
}
