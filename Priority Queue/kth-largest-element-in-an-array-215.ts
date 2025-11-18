// https://leetcode.com/problems/kth-largest-element-in-an-array/

// TL;DR:
// Two solutions:
//   1. Use a min heap of size k:
//      - For each element, push it to the heap and if the heap size is greater than k, pop the smallest element
//      - Return the smallest element from the heap
//   2. Use quick select:
//      - Choose a random pivot and partition the array into two parts:
//        - Elements less than the pivot are on the left
//        - Elements greater than the pivot are on the right
//      - If the pivot index is greater than k, recurse and return the result of the left part
//      - If the pivot index is less than k, recurse and return the result of the right part
//      - If the pivot index is equal to k, return the pivot

// Complexities:
//   - Min Heap:
//     - Time => O(n * log(k)), where n is the number of elements and k is the number of largest elements to return
//     - Space => O(k), where k is the number of largest elements to return
//   - Quick Select:
//     - Time => Avg: O(n), Worst: O(n^2), where n is the number of elements
//     - Space => Avg: O(log(n)), Worst: O(n), because of the recursive call stack

import { MinPriorityQueue } from "@datastructures-js/priority-queue";

function quickSelect(
	nums: number[],
	l: number,
	r: number,
	kth: number
): number {
	const pivotIndex = Math.floor(Math.random() * (r - l + 1)) + l;
	[nums[pivotIndex], nums[r]] = [nums[r], nums[pivotIndex]];

	const pivot = nums[r];
	let p = l;
	for (let i = l; i < r; i++) {
		if (nums[i] < pivot) {
			[nums[i], nums[p]] = [nums[p], nums[i]];
			p++;
		}
	}
	[nums[r], nums[p]] = [nums[p], nums[r]];
	if (p > kth) {
		return quickSelect(nums, l, p - 1, kth);
	}
	if (p < kth) {
		return quickSelect(nums, p + 1, r, kth);
	}

	return nums[p];
}

function findKthLargest(nums: number[], k: number): number {
	const minHeap = new MinPriorityQueue<number>();
	for (const x of nums) {
		minHeap.enqueue(x);
		if (minHeap.size() > k) {
			minHeap.dequeue();
		}
	}

	return minHeap.front();

	// const kth = nums.length - k;
	// return quickSelect(nums, 0, nums.length - 1, kth);
}
