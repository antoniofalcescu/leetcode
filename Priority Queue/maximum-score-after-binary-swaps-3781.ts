// https://leetcode.com/problems/maximum-score-after-binary-swaps/

// TL;DR:
// The main idea is that we can move the 1s all the way to the left, but not to the right:
//    - This means that when we find a 1, we always want to take the maximum number found so far and add it to the sum
// Use a max heap to store the numbers
// Iterate through both nums and s in parallel with index:
//   - Enqueue the current number to the max heap
//   - If the current character is a 1, dequeue the front number from the max heap and add it to the sum
// Return the sum

// Complexities:
// Time => O(n * log(n)), where n is the length of the input array
// Space => O(n), where n is the length of the input array

function maximumScore(nums: number[], s: string): number {
	const maxHeap = new MaxPriorityQueue<number>();
	let sum = 0;
	for (let i = 0; i < s.length; i++) {
		maxHeap.enqueue(nums[i]);
		if (s[i] === "1") {
			sum += maxHeap.dequeue();
		}
	}

	return sum;
}
